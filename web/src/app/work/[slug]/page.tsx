import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { films, getFilm } from "@/lib/films";
import CaseHeader from "@/components/case/CaseHeader";
import CasePlayer from "@/components/case/CasePlayer";
import CaseDescription from "@/components/case/CaseDescription";
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

  return {
    title: `${film.title} — Quick Films`,
    description,
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

  return (
    <article className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-10 md:pb-32">
      <CaseHeader film={film} />
      <CasePlayer film={film} />
      <CaseDescription description={film.description} />
      <CaseCredits credits={film.credits} />
      <CaseNav prev={prev} next={next} />
    </article>
  );
}
