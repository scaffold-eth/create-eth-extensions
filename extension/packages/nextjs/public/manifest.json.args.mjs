export const name = "My Test DApp"
export const description = "Testing manifest template"
export const iconPath = "" // allows to omit default SE-2 icons in manifest.json
export const extraContent = {
  short_name: "My Test DApp",
  display: "standalone",
  orientation: "portrait",
  theme_color: "#ffffff",
  background_color: "#000000",
  start_url: "/",
  icons: [
    {
      "src": "/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
