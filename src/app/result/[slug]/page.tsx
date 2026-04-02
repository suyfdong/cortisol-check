import { personaTypes, getPersonaBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ResultClient } from "./ResultClient";

export async function generateStaticParams() {
  return personaTypes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const persona = getPersonaBySlug(slug);
  if (!persona) return {};

  const title = `I'm ${persona.name} ${persona.spiritAnimal.emoji} — What's YOUR Cortisol Level?`;
  const description = persona.description.slice(0, 155) + "...";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cortisollevel.xyz/result/${slug}`,
      siteName: "cortisollevel.xyz",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const persona = getPersonaBySlug(slug);

  if (!persona) {
    notFound();
  }

  return <ResultClient persona={persona} />;
}
