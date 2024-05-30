# EIP-712 extension

This extension provides an example implementation of EIP-712, allowing you to send, sign, and verify typed messages in a user-friendly manner.

## Installation

```bash
npx create-eth@latest -e eip-712
```

## Features

- **Send Typed Messages**: Easily send typed messages to a specified recipient (e.g., Bob).
- **Sign Messages**: Sign typed messages securely.
- **Verify Messages**: Verify the signed messages on both frontend and backend.

### Frontend Verification

To verify a message on the frontend, the `useVerifyTypedData` hook from the `wagmi` library is used.

### Backend Verification

For backend verification, the `recoverTypedDataAddress` function from the `viem` library is used.
