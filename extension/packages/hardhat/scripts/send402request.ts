import * as dotenv from "dotenv";
dotenv.config();
import { privateKeyToAccount } from "viem/accounts";
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import { registerExactEvmScheme } from "@x402/evm/exact/client";
import { getDecryptedPK } from "./getDecryptedPK";
import { confirm } from "@inquirer/prompts";
import { formatUnits } from "ethers";

const URL_TO_SEND_REQUEST = "http://localhost:3000/api/payment/builder";

async function main() {
  const privateKey = await getDecryptedPK();

  if (!privateKey) return;

  const signer = privateKeyToAccount(privateKey as `0x${string}`);

  // Create x402 client and register EVM scheme
  const client = new x402Client();
  registerExactEvmScheme(client, { signer });

  // First, fetch payment details (expecting 402 Payment Required response)
  console.log("\n 📡 Fetching payment details...\n");
  const paymentDetailsResponse = await fetch(URL_TO_SEND_REQUEST, {
    method: "GET",
  });

  // 402 is the expected response - it contains payment requirements
  if (paymentDetailsResponse.status !== 402) {
    if (paymentDetailsResponse.ok) {
      console.log("Endpoint is not payment-protected. Response:", await paymentDetailsResponse.text());
    } else {
      console.error("Unexpected error:", paymentDetailsResponse.status);
    }
    return;
  }

  // v2: Payment requirements are in the PAYMENT-REQUIRED header (base64 encoded JSON)
  const paymentRequiredHeader = paymentDetailsResponse.headers.get("PAYMENT-REQUIRED");
  let networkName = "unknown network";

  if (paymentRequiredHeader) {
    try {
      const paymentDetails = JSON.parse(Buffer.from(paymentRequiredHeader, "base64").toString("utf-8"));

      if (paymentDetails.accepts && paymentDetails.accepts.length > 0) {
        const payment = paymentDetails.accepts[0];
        networkName = payment.network || "unknown network";

        console.log("Payment Details:");
        console.log(`  Scheme: ${payment.scheme || "exact"}`);
        console.log(`  Network: ${payment.network}`);
        // Price can be in different formats: "$0.01", maxAmountRequired, or amount (in smallest units)
        const assetName = payment.extra?.name || "USDC";
        const priceDisplay = payment.price
          || (payment.maxAmountRequired ? formatUnits(payment.maxAmountRequired, 6) + ` ${assetName}` : null)
          || (payment.amount ? formatUnits(payment.amount, 6) + ` ${assetName}` : "N/A");
        console.log(`  Price: ${priceDisplay}`);
        console.log(`  Pay To: ${payment.payTo}`);
        if (paymentDetails.description) {
          console.log(`  Description: ${paymentDetails.description}`);
        }
        console.log();
      }
    } catch (e) {
      console.log("Could not parse payment requirements header");
    }
  } else {
    console.log("No PAYMENT-REQUIRED header found in 402 response");
  }

  const confirmSend = await confirm({ message: "Send transaction with payment? (y/n)" });
  if (!confirmSend) {
    console.log("Transaction cancelled.");
    return;
  }

  console.log(`\n 📡 Sending x402 transaction on ${networkName} from`, signer.address, "\n");

  // Wrap fetch with payment handling using x402 client
  const fetchWithPayment = wrapFetchWithPayment(fetch, client);

  try {
    const response = await fetchWithPayment(URL_TO_SEND_REQUEST, {
      method: "GET",
    });

    const body = await response.json();
    console.log(body);

    // v2 uses PAYMENT-RESPONSE header instead of x-payment-response
    const paymentResponseHeader = response.headers.get("PAYMENT-RESPONSE");
    if (paymentResponseHeader) {
      console.log("Payment Response:", paymentResponseHeader);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Error:", error);
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
