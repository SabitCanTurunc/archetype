import { Metadata } from "next";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/db";
import { TestSession } from "@/models/TestSession";
import { archetypeContents } from "@/lib/scoring/archetype-content";
import { ArchetypeReading } from "@/components/archetype/ArchetypeReading";

interface SharedPageProps {
  params: Promise<{ token: string }>;
}

// We generate dynamic OpenGraph tags here based on the shared archetype
export async function generateMetadata({ params }: SharedPageProps): Promise<Metadata> {
  const { token } = await params;

  try {
    await connectToDatabase();
    const session = await TestSession.findOne({ publicToken: token }).lean();

    if (!session) {
      return { title: "Not Found", robots: { index: false } };
    }

    const archetype = archetypeContents[session.primaryArchetype.id];
    
    if (!archetype) {
      return { title: "Not Found", robots: { index: false } };
    }

    const title = `${archetype.name.en} — Archetype`;
    const description = archetype.tagline.en;
    const ogImageUrl = `/api/og?archetype=${archetype.id}`;

    return {
      title,
      description,
      robots: {
        index: false,
        follow: false,
      },
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
  } catch (error) {
    return { title: "Archetype", robots: { index: false } };
  }
}

export default async function SharedArchetypePage({ params }: SharedPageProps) {
  const { token } = await params;

  await connectToDatabase();
  const session = await TestSession.findOne({ publicToken: token }).lean();

  if (!session) {
    notFound();
  }

  // STRICT PRIVACY: We only care about the primary archetype ID here.
  // We do not pass the full session or any answers/scores to the client.
  const archetypeId = session.primaryArchetype.id;
  const archetype = archetypeContents[archetypeId];

  if (!archetype) {
    notFound();
  }

  // Log analytics for server-side view (basic tracking, ideally client side or via middleware)
  console.log(`[Analytics] shared_archetype_viewed - ${archetypeId}`);

  return <ArchetypeReading archetype={archetype} isSharedContext={true} />;
}
