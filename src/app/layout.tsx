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
  title: "Hakon Digital | Premium Web Development Sydney",
  description:
    "Hakon Digital builds premium, high-performance websites for law firms, construction companies, and growing businesses across Sydney and Australia.",
  icons: {
    icon: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Hakon Digital | Premium Web Development Sydney",
    description:
      "High-performance, modern websites built for serious businesses. Based in Sydney.",
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
