export const extraContents = `## 🛠 Setup PWA Features with Serwist

This guide will help you set up Progressive Web App (PWA) features in your Scaffold-ETH 2 project using Serwist.

#### ✅ Step 1: Generate VAPID Keys ✅

First, you'll need to generate VAPID (Voluntary Application Server Identification) keys for web push notifications:

\`\`\`bash
yarn generate-vapid-keys
\`\`\`

After generating the keys, paste them into your \`.env\` file.

#### ✅ Step 2: Leverage Serwist Features ✅

This extension comes with [Serwist](https://serwist.pages.dev/) integration out of the box, providing the following PWA capabilities:

- 📱 **Installable Web App**: Users can install your dApp on their devices
- 🔄 **Offline Support**: Basic functionality works without internet connection
- 📨 **Push Notifications**: Engage users with web push notifications
- 💨 **Fast Loading**: Improved performance through service worker caching

#### ✅ Step 3: Configure Your PWA ✅

You can customize your PWA settings in the following locations:

- PWA manifest: \`packages/nextjs/public/manifest.json\`
- Serwist configuration: \`packages/nextjs/serwist.config.ts\`
- Push notification handling: \`packages/nextjs/utils/push-notifications.ts\`

#### 📚 Additional Resources

- [Serwist Documentation](https://serwist.pages.dev/)
- [Web Push Notifications Guide](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)`;
