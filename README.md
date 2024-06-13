# EIP-712 extension

This extension provides an example implementation of EIP-712, allowing you to send, sign, and verify typed messages in a user-friendly manner.

## Installation

```bash
npx create-eth@latest -e eip-712
```

## Features

- **Send Typed Messages**: Easily send typed messages to a specified recipient (e.g., Bob).
- **Sign Messages**: Sign typed messages securely.
- **Verify Messages**: Verify the signed messages on both frontend and backend. The name and message used for verification are taken from an input field and a textarea, respectively. These values can be changed to check the verification process.

### Frontend Verification

To verify a message on the frontend, the `useVerifyTypedData` hook from the `wagmi` library is used. For more details, refer to the `/app/eip-712/page.tsx` file.

### Backend Verification

For backend verification, the `recoverTypedDataAddress` function from the `viem` library is used. For more details, refer to the `/app/api/verify/route.ts` file.
