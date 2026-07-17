import Link from "next/link";
import Wordmark from "./Wordmark";

const MAILTO =
  "mailto:hello@quickfilms.in?subject=Start%20a%20project%20with%20Quick%20Films";
// WhatsApp — client's real number not confirmed yet. Set to a full
// international number (e.g. "https://wa.me/9198XXXXXXXX") to surface the link.
const WHATSAPP: string | null = null;

const NAV = [
  { label: "Work", href: "/work/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const TICKS = ["00:00", "00:30", "01:00", "01:30", "02:00"];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-white/5 bg-bg pt-20 md:pt-28"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        {/* Three-column anatomy */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="text-muted">(00)</span> — Studio
            </p>
            <p className="max-w-sm text-lg leading-snug text-text">
              <span className="text-text">A film-grade</span> edit, colour and
              motion studio cutting documentary and short-form work{" "}
              <span className="text-text">for people who care how it feels.</span>
            </p>
          </div>

          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="text-muted">(01)</span> — Navigation
            </p>
            <ul className="space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-lg text-muted underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-text hover:decoration-white/25"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="text-muted">(02)</span> — Get in touch
            </p>
            <a
              href={MAILTO}
              className="block text-lg text-text transition-colors duration-200 hover:text-red"
            >
              hello@quickfilms.in
            </a>
            {WHATSAPP && (
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-lg text-text transition-colors duration-200 hover:text-red"
              >
                WhatsApp
              </a>
            )}
            <p className="mt-4 text-sm text-muted">Bengaluru · Remote worldwide</p>
            <a
              href={MAILTO}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-cta px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-cta-hover"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Start a project
            </a>
          </div>
        </div>

        {/* Ruler */}
        <div className="mt-16 md:mt-24" aria-hidden="true">
          <div className="qf-ticks w-full" />
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted tabular-nums">
            {TICKS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Giant wordmark — clip the right-edge bleed so the oversized type never
          forces horizontal page scroll on narrow viewports (was ~38px over at
          390px). Left-anchored; only the far-right tail clips. */}
      <div className="mx-auto max-w-[1600px] overflow-hidden px-5 pt-6 md:px-10">
        <Wordmark
          href={null}
          className="block leading-[0.8]"
          style={{
            // "quickFILMS" measures ~6.25em wide; size it from the padded
            // container so the whole word fits every viewport (no clipped "S").
            fontSize: "clamp(2rem, calc((100vw - 2.5rem) / 6.5), 15rem)",
          }}
        />
      </div>

      {/* Legal bar */}
      <div className="mx-auto mt-8 max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col gap-2 border-t border-white/5 py-6 text-[11px] uppercase tracking-[0.16em] text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Quick Films — Edit · Grade · Motion</p>
          <p>All work by Quick Films</p>
        </div>
      </div>
    </footer>
  );
}
