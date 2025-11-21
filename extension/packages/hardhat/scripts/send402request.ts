import * as dotenv from "dotenv";
dotenv.config();
import { privateKeyToAccount } from "viem/accounts";
import { wrapFetchWithPayment, decodeXPaymentResponse } from "x402-fetch";
import { getDecryptedPK } from "./getDecryptedPK";
// @ts-expect-error - @inquirer/prompts is not typed
import { confirm } from "@inquirer/prompts";
import { formatUnits } from "ethers";

const URL_TO_SEND_REQUEST = "http://localhost:3000/api/payment/builder";

async function main() {
  const privateKey = await getDecryptedPK();

  if (!privateKey) return;

  const account = privateKeyToAccount(privateKey as `0x${string}`);

  // First, fetch payment details
  console.log("\n 📡 Fetching payment details...\n");
  const paymentDetailsResponse = await fetch(URL_TO_SEND_REQUEST, {
    method: "GET",
  });
  const paymentDetails = await paymentDetailsResponse.json();

  if (paymentDetails.accepts && paymentDetails.accepts.length > 0) {
    const payment = paymentDetails.accepts[0];
    console.log("Payment Details:");
    console.log(`  Network: ${payment.network}`);
    console.log(`  Amount: ${formatUnits(payment.maxAmountRequired, 6)}`);
    console.log(`  Asset: ${payment.extra?.name || payment.asset}`);
    console.log(`  Pay To: ${payment.payTo}`);
    console.log(`  Description: ${payment.description}`);
    console.log();
  }

  const confirmSend = await confirm({ message: "Send transaction with payment? (y/n)" });
  if (!confirmSend) {
    console.log("Transaction cancelled.");
    return;
  }

  console.log("\n 📡 Sending x402 transaction on baseSepolia from", account.address, "\n");

  const fetchWithPayment = wrapFetchWithPayment(fetch, account);

  fetchWithPayment(URL_TO_SEND_REQUEST, {
    method: "GET",
  })
    .then(async (response: Response) => {
      const body = await response.json();
      console.log(body);

      const paymentResponse = decodeXPaymentResponse(response.headers.get("x-payment-response")!);
      console.log(paymentResponse);
    })
    .catch((error: any) => {
      console.error("error", error.response?.data?.error);
    });
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
