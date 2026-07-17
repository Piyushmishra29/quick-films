import type { Metadata } from "next";
import "./globals.css";
import { bdoGrotesk, inter } from "./fonts";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import LenisProvider from "@/components/shared/LenisProvider";

const SITE_TITLE = "Quick Films — Edit · Grade · Motion";
const SITE_DESCRIPTION =
  "Quick Films is a video-editing and short-form film studio. Editing, colour grade, and motion for documentary and short-form work.";

export const metadata: Metadata = {
  // NOTE: domain is provisional — client has not confirmed the final URL.
  metadataBase: new URL("https://quickfilms.in"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
