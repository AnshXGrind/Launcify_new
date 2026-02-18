import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Automation Consulting | Launcify",
  description:
    "Custom AI automation systems that eliminate manual work and save businesses 20+ hours per week.",
  openGraph: {
    title: "Launcify",
    description: "Enterprise AI automation consulting for scaling teams.",
    url: "https://launcify.vercel.app",
    siteName: "Launcify",
    type: "website",
  },
  metadataBase: new URL("https://launcify.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-text antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
