import Reveal from "@/components/shared/Reveal";

/**
 * Editorial description block. Strips a leading "DRAFT —" marker if the
 * data still carries one, then always appends the client-facing draft note
 * (spec §Case: "Draft copy — to be confirmed").
 */
export default function CaseDescription({
  description,
}: {
  description: string;
}) {
  const clean = description.replace(/^DRAFT\s*—\s*/i, "").trim();

  return (
    <Reveal as="section" className="mx-auto mb-16 max-w-2xl md:mb-24">
      <p className="text-lg leading-relaxed text-text/90 md:text-xl">
        {clean}
      </p>
      <p className="mt-4 text-sm italic text-muted">
        Draft copy — to be confirmed
      </p>
    </Reveal>
  );
}
