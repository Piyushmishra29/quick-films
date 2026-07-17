import type { Metadata } from "next";
import "./globals.css";
import { bdoGrotesk, inter } from "./fonts";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import LenisProvider from "@/components/shared/LenisProvider";

export const metadata: Metadata = {
  title: "Quick Films — Edit · Grade · Motion",
  description:
    "Quick Films is a video-editing and short-form film studio. Editing, colour grade, and motion for documentary and short-form work.",
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
        <LenisProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
