import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { films, getFilm, type Film } from "@/lib/films";
import CaseHeader from "@/components/case/CaseHeader";
import CasePlayer from "@/components/case/CasePlayer";
import CaseDescription from "@/components/case/CaseDescription";
import CaseFrames from "@/components/case/CaseFrames";
import PostcardsGallery from "@/components/case/PostcardsGallery";
import CaseCredits from "@/components/case/CaseCredits";
import CaseNav from "@/components/case/CaseNav";
import { SITE_URL } from "../../layout";

// Static export: every case page is generated at build time from films.ts.
export function generateStaticParams() {
  return films.map((film) => ({ slug: film.slug }));
}

// "M:SS" / "MM:SS" runtime → ISO 8601 duration (e.g. "1:41" → "PT1M41S").
function toIsoDuration(duration: string): string {
  const [min, sec] = duration.split(":").map((n) => parseInt(n, 10) || 0);
  return `PT${min}M${sec}S`;
}

function buildJsonLd(film: Film) {
  const abs = (path: string) => `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoObject",
        name: film.title,
        description: film.description,
        thumbnailUrl: abs(film.poster),
        contentUrl: abs(film.video),
        uploadDate: `${film.year}-01-01`,
        duration: toIsoDuration(film.duration),
        genre: film.tags[0],
        creator: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work/` },
          {
            "@type": "ListItem",
            position: 3,
            name: film.title,
            item: `${SITE_URL}/work/${film.slug}/`,
          },
        ],
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) return {};

  const description = film.description.replace(/^DRAFT\s*—\s*/i, "").trim();
  const title = film.seoTag
    ? `${film.title} — ${film.seoTag} — Quick Films`
    : `${film.title} — Quick Films`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${film.slug}/` },
    openGraph: {
      type: "article",
      siteName: "Quick Films",
      title,
      description,
      url: `/work/${film.slug}/`,
      images: [{ url: film.poster, alt: film.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [film.poster],
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = getFilm(slug);

  if (!film) {
    notFound();
  }

  const index = films.findIndex((f) => f.slug === film.slug);
  const prev = films[(index - 1 + films.length) % films.length];
  const next = films[(index + 1) % films.length];

  // Section numbering shifts as optional sections (FRAMES strip, and the
  // POSTCARDS clip gallery) are inserted between the edit copy and credits.
  const hasFrames = !!film.stills && film.stills.length > 0;
  const hasClips = !!film.clips && film.clips.length > 0;
  const pad = (n: number) => String(n).padStart(2, "0");
  const clipsIndex = hasFrames ? "04" : "03";
  const extra = (hasFrames ? 1 : 0) + (hasClips ? 1 : 0);
  const creditsIndex = pad(3 + extra);
  const navIndex = pad(4 + extra);

  return (
    <article className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(film)) }}
      />
      <CaseHeader film={film} />
      <CasePlayer film={film} />
      <CaseDescription description={film.description} />
      {hasFrames && <CaseFrames stills={film.stills!} index="03" />}
      {hasClips && <PostcardsGallery clips={film.clips!} index={clipsIndex} />}
      <CaseCredits credits={film.credits} index={creditsIndex} />
      <CaseNav prev={prev} next={next} index={navIndex} />
    </article>
  );
}
