import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { films, getFilm } from "@/lib/films";
import CaseHeader from "@/components/case/CaseHeader";
import CasePlayer from "@/components/case/CasePlayer";
import CaseDescription from "@/components/case/CaseDescription";
import CaseFrames from "@/components/case/CaseFrames";
import CaseCredits from "@/components/case/CaseCredits";
import CaseNav from "@/components/case/CaseNav";

// Static export: every case page is generated at build time from films.ts.
export function generateStaticParams() {
  return films.map((film) => ({ slug: film.slug }));
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
  const title = `${film.title} — Quick Films`;

  return {
    title,
    description,
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

  // Section numbering shifts by one when the film carries a FRAMES strip.
  const hasFrames = !!film.stills && film.stills.length > 0;
  const creditsIndex = hasFrames ? "04" : "03";
  const navIndex = hasFrames ? "05" : "04";

  return (
    <article className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pb-32">
      <CaseHeader film={film} />
      <CasePlayer film={film} />
      <CaseDescription description={film.description} />
      {hasFrames && <CaseFrames stills={film.stills!} index="03" />}
      <CaseCredits credits={film.credits} index={creditsIndex} />
      <CaseNav prev={prev} next={next} index={navIndex} />
    </article>
  );
}
