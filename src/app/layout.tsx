import { Space_Grotesk, Inter } from "next/font/google";
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

export const metadata = {
  metadataBase: new URL("https://www.hakondigital.com"),
  title: "Hakon Digital | Affordable Website Design for Small Businesses Sydney",
  description:
    "Professional small business websites starting from $960 AUD. Built in Sydney. Clear pricing. Modern design. No complexity.",
  icons: {
    icon: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Hakon Digital | Affordable Website Design for Small Businesses Sydney",
    description:
      "Professional small business websites starting from $960 AUD. Built in Sydney. Clear pricing. Modern design. No complexity.",
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
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
