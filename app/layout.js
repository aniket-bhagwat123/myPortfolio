import "./globals.css";
import { getSiteUrl, siteConfig } from "../lib/site";

const siteUrl = getSiteUrl();
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata = {
  metadataBase,
  applicationName: siteConfig.siteName,
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "/fevicon.png",
    shortcut: "/fevicon.png",
    apple: "/fevicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
