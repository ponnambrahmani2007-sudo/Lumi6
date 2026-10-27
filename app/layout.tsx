import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumi6 — Think. Explore. Discover.",
  description:
    "An interactive learning platform for children aged 8–12. Explore big questions, conduct visual experiments, sketch ideas, and discover how the world works without fear of judgment.",
  keywords: [
    "Lumi6",
    "kids learning",
    "science experiments for kids",
    "interactive math",
    "coding for children",
    "inquiry-based learning",
    "safe learning platform",
  ],
  authors: [{ name: "Lumi6 Learning Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#7057E8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-lumi-bg text-lumi-text antialiased selection:bg-lumi-lavender selection:text-lumi-deep min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
