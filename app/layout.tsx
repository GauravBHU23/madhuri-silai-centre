import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#7B1A3A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Madhuri Silai Centre — Ladies Tailoring & Boutique | Bihar Sharif, Nalanda",
  description:
    "Madhuri Silai Centre, Bihar Sharif — Expert blouse stitching, suit tailoring & boutique work. Simple Blouse ₹70, Star Design ₹150, Custom Design ₹200. 15+ years experience. Near Gas Godown, Near RK Library, Below Fitness Gym, PIN 803101.",
  keywords: "madhuri silai centre, silai centre bihar sharif, ladies tailoring nalanda, blouse stitching bihar sharif, boutique bihar sharif, blouse design, suit tailoring, saya stitching, fall lagai, piko work, 803101",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Madhuri Silai",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Madhuri Silai Centre — Ladies Tailoring & Boutique",
    description: "Expert blouse stitching & tailoring in Bihar Sharif, Nalanda. Blouse from ₹70. WhatsApp: 7484836382",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
