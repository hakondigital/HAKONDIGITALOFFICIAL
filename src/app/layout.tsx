import { Space_Grotesk, Inter, Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display font for hero headlines — clean geometric grotesk, Palantir-style weight
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.hakondigital.com"),
  title: "Hakon Digital | Custom Software, AI Integration & Tech Consultancy — Sydney",
  description:
    "Custom software, AI integration into your existing CRM, and independent technical consultancy. Vendor diagnostics, automation audits, and stack reviews from a Sydney engineer.",
  icons: {
    icon: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Hakon Digital | Custom Software, AI Integration & Tech Consultancy — Sydney",
    description:
      "Custom software, AI integration into your existing CRM, and independent technical consultancy. Vendor diagnostics, automation audits, and stack reviews from a Sydney engineer.",
    url: "https://www.hakondigital.com",
    siteName: "Hakon Digital",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${barlow.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
