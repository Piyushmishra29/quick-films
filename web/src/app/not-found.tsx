import type { Metadata } from "next";
import Link from "next/link";

// Own title so the tab keeps saying 404 after hydration (the default
// not-found page shipped a second <title> that the root layout's won).
export const metadata: Metadata = {
  title: "404 — Quick Films",
};

export default function NotFound() {
  return (
    <main className="qf-minh-screen flex flex-col items-center justify-center px-5 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red align-middle" />
        Missing reel — 404
      </p>
      <h1 className="mt-6 font-display text-6xl font-black uppercase leading-[0.85] tracking-[-0.03em] text-text md:text-8xl">
        Wrong cut
      </h1>
      <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-muted">
        This frame didn&apos;t make the edit. The footage you&apos;re after is
        probably on the work index.
      </p>
      <div className="mt-10 flex items-center gap-6 text-[11px] uppercase tracking-[0.22em]">
        <Link
          href="/"
          className="text-muted transition-colors duration-200 hover:text-text"
        >
          ← Home
        </Link>
        <Link
          href="/work/"
          className="rounded-full bg-red-cta px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-red-cta-hover"
        >
          See the work
        </Link>
      </div>
    </main>
  );
}
