export const titleTemplate = "%s | Example Extension";
export const thumbnailPath = "/example-thumbnail-in-public-folder.png";

export const metadataOverrides = {
  applicationName: '$$title$$',
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: 'title'
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }]
  }
}
