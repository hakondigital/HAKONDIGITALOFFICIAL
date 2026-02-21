import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hakondigital.com"),
  title:
    "HAKON DIGITAL | Precision Web Engineering | Sydney, Australia",
  description:
    "High-performance digital engineering firm specialising in advanced JSX architecture, AI-enhanced web systems, secure infrastructure deployment, and precision-built web platforms. Based in Balgowlah, Northern Beaches, Sydney.",
  keywords: [
    "web development Sydney",
    "digital engineering firm",
    "React development Australia",
    "Next.js developer Sydney",
    "AI web systems",
    "custom web applications",
    "TypeScript developer",
    "Hakon Digital",
    "Northern Beaches web developer",
    "secure web infrastructure",
  ],
  authors: [{ name: "Noah Campbell", url: "https://www.hakondigital.com" }],
  openGraph: {
    title:
      "HAKON DIGITAL | Precision Web Engineering | Sydney, Australia",
    description:
      "High-performance digital engineering firm specialising in advanced JSX architecture, AI-enhanced web systems, and secure infrastructure deployment.",
    url: "https://www.hakondigital.com",
    siteName: "HAKON DIGITAL",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAKON DIGITAL | Precision Web Engineering",
    description:
      "High-performance digital engineering firm specialising in advanced web architecture and AI-enhanced systems.",
  },
  robots: {
    index: true,
    follow: true,
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
