import { ImageResponse } from 'next/og';
import { archetypeContents } from '@/lib/scoring/archetype-content';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const archetypeId = searchParams.get('archetype')?.toUpperCase();

    if (!archetypeId || !archetypeContents[archetypeId]) {
      return new Response('Not found', { status: 404 });
    }

    const archetype = archetypeContents[archetypeId];
    // We'll use the English version for the OG image to ensure maximum compatibility, 
    // or maybe fallback to the first language provided. Using English for now.
    const name = archetype.name.en;
    const [line1, line2] = archetype.tagline.en.split('. ').map(s => s.replace('.', ''));

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Top subtle branding */}
          <div
            style={{
              position: 'absolute',
              top: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '0.3em',
              fontSize: '24px',
              color: '#52525b', // zinc-600
              textTransform: 'uppercase',
            }}
          >
            ARCHETYPE
          </div>

          {/* Archetype Name */}
          <div
            style={{
              display: 'flex',
              fontSize: '120px',
              fontWeight: 300,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '60px',
              textAlign: 'center',
            }}
          >
            {name}
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '48px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#a1a1aa', // zinc-400
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            <span style={{ display: 'flex' }}>{line1}.</span>
            {line2 && <span style={{ display: 'flex', marginTop: '10px' }}>{line2}.</span>}
          </div>

          {/* Bottom branding / Accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '2px',
                backgroundColor: '#3f3f46', // zinc-700
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`[OG Image Error] ${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
