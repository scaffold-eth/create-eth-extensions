export const titleTemplate = "%s | My PWA App";

export const extraIcons = {
  shortcut: "/favicon.ico",
  apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
};

export const extraMetadata = {
  applicationName: "title",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "title",
  },
  formatDetection: {
    telephone: false,
  },
};
