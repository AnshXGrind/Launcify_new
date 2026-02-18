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
  metadataBase: new URL("https://launcify.vercel.app"),
  alternates: {
    canonical: "https://launcify.vercel.app",
  },
  openGraph: {
    title: "Launcify",
    description: "Enterprise AI automation consulting for scaling teams.",
    url: "https://launcify.vercel.app",
    siteName: "Launcify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@launcify",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Launcify",
  url: "https://launcify.vercel.app",
  description:
    "Enterprise AI automation consulting firm helping scaling businesses eliminate manual operations.",
  sameAs: ["https://twitter.com/launcify"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://launcify.vercel.app/book-call",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
