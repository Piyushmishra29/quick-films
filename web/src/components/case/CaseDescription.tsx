import Reveal from "@/components/shared/Reveal";
import SectionRule from "@/components/home/SectionRule";

/**
 * Editorial description block. Strips a leading "DRAFT —" marker if the
 * data still carries one.
 */
export default function CaseDescription({
  description,
}: {
  description: string;
}) {
  const clean = description.replace(/^DRAFT\s*—\s*/i, "").trim();

  return (
    <Reveal as="section" className="mb-16 md:mb-24">
      <SectionRule index="02" label="The Edit" headingLevel="h2" />
      <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-text/90 md:mt-12 md:text-xl">
        {clean}
      </p>
    </Reveal>
  );
}
