"use client";

import Link from "next/link";
import { useState } from "react";
import Wordmark from "./Wordmark";

const LINKS = [
  { label: "Work", href: "/work/", num: "01" },
  { label: "About", href: "/#about", num: "02" },
  { label: "Contact", href: "/#contact", num: "03" },
];

const MAILTO =
  "mailto:hello@quickfilms.in?subject=Start%20a%20project%20with%20Quick%20Films";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <Wordmark className="text-xl md:text-2xl" href="/" />

        <div className="flex items-center gap-4 md:gap-10">
          <ul className="hidden items-center gap-7 text-sm text-muted sm:flex md:gap-9">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-start gap-1 transition-colors duration-200 hover:text-text"
                >
                  <span>{l.label}</span>
                  <span className="text-[10px] leading-none text-muted transition-colors duration-200 group-hover:text-yellow">
                    {l.num}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={MAILTO}
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-red-cta px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-cta-hover md:px-5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Start a project
          </a>

          {/* Mobile menu toggle — surfaces the nav links below the sm breakpoint */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden"
          >
            <span
              className={`h-px w-5 bg-text transition-transform duration-200 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-text transition-transform duration-200 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-b border-white/5 bg-bg/95 backdrop-blur-sm transition-[max-height] duration-300 ease-out sm:hidden ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-5 py-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3 text-sm uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:text-text"
              >
                <span>{l.label}</span>
                <span className="text-[10px] text-muted">{l.num}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
