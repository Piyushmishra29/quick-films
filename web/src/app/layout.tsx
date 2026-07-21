import type { Metadata } from "next";
import "./globals.css";
import { bdoGrotesk, inter } from "./fonts";
import Nav from "@/components/shared/Nav";
import ScrollProgress from "@/components/shared/ScrollProgress";
import Footer from "@/components/shared/Footer";
import LenisProvider from "@/components/shared/LenisProvider";

export const SITE_URL = "https://quickfilms.co";

const SITE_TITLE =
  "Quick Films — Narrative & Brand Film Studio, Bengaluru";
const SITE_DESCRIPTION =
  "Quick Films is a video editing and film studio in Bengaluru, India — narrative films, brand films, short-form content and digital ads, cut and graded end to end.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Quick Films",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: "/hero-desktop.jpg", width: 1600, height: 900, alt: "Quick Films" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/hero-desktop.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bdoGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-bg text-text antialiased">
        <a href="#main" className="qf-skip">
          Skip to content
        </a>
        <LenisProvider>
          <ScrollProgress />
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
