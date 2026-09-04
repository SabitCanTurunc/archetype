import { Metadata } from "next";
import { notFound } from "next/navigation";
import { archetypeContents } from "@/lib/scoring/archetype-content";
import { ArchetypeReading } from "@/components/archetype/ArchetypeReading";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Ensure these pages are statically generated where possible
export async function generateStaticParams() {
  return Object.keys(archetypeContents).map((id) => ({
    slug: id.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const archetypeId = slug.toUpperCase();
  const archetype = archetypeContents[archetypeId];

  if (!archetype) {
    return {
      title: "Archetype Not Found",
    };
  }

  // Assuming primary language for metadata is English, or we could detect somehow,
  // but metadata is usually static per URL. We'll use English for global SEO.
  const title = `${archetype.name.en} — Archetype`;
  const description = archetype.tagline.en;

  // The OG image route will be /api/og?archetype=OBSERVER
  const ogImageUrl = `/api/og?archetype=${archetype.id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Archetype",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ArchetypePage({ params }: PageProps) {
  const { slug } = await params;
  const archetypeId = slug.toUpperCase();
  const archetype = archetypeContents[archetypeId];

  if (!archetype) {
    notFound();
  }

  return <ArchetypeReading archetype={archetype} isSharedContext={false} />;
}
