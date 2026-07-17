import Wordmark from "./Wordmark";

const MAILTO =
  "mailto:hello@quickfilms.in?subject=Start%20a%20project%20with%20Quick%20Films";
// WhatsApp — client's real number not confirmed yet. Set this to a full
// international number (e.g. "https://wa.me/9198XXXXXXXX") to surface the link;
// left null so we never ship a dead link to an invalid number.
const WHATSAPP: string | null = null;

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/5 bg-bg px-5 pb-10 pt-20 md:px-10 md:pb-14 md:pt-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-10 text-sm uppercase tracking-[0.2em] text-muted md:mb-14">
          <span className="text-yellow">/</span> Start a project
        </p>

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-6">
            <a
              href={MAILTO}
              className="text-lg text-text transition-colors duration-200 hover:text-red md:text-xl"
            >
              hello@quickfilms.in
            </a>
            {WHATSAPP && (
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-text transition-colors duration-200 hover:text-red md:text-xl"
              >
                WhatsApp
              </a>
            )}
          </div>

          <a
            href={MAILTO}
            className="inline-flex w-fit rounded-full bg-red px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            Start a project
          </a>
        </div>

        <Wordmark
          href={null}
          className="mt-16 block text-[18vw] leading-[0.85] md:mt-24 md:text-[15vw]"
        />

        <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Quick Films. Edit · Grade · Motion.</p>
          <p>All work by Quick Films.</p>
        </div>
      </div>
    </footer>
  );
}
