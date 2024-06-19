import { NextResponse } from "next/server";
import { recoverTypedDataAddress } from "viem";
import { EIP_712_DOMAIN, EIP_712_TYPE, VerifyRequestBody, generateMessageToBob } from "~~/utils/eip-712";

export async function POST(req: Request) {
  try {
    const { fromName, message, signature, signer } = (await req.json()) as VerifyRequestBody;

    const recoveredAddress = await recoverTypedDataAddress({
      domain: EIP_712_DOMAIN,
      types: EIP_712_TYPE,
      primaryType: "Mail",
      message: generateMessageToBob({ fromName, fromAddress: signer, message }),
      signature,
    });

    if (recoveredAddress !== signer) {
      return NextResponse.json({ error: "Recovered address does not match signer" }, { status: 401 });
    }

    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
