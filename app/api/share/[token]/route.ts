import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { TestSession } from "@/models/TestSession";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    
    if (!token) {
      return NextResponse.json({ error: "Missing token parameter" }, { status: 400 });
    }

    await connectToDatabase();

    const session = await TestSession.findOne({ publicToken: token });

    if (!session) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // STRICT PRIVACY: Return ONLY the archetype IDs, nothing else.
    // No answers, no dimensions, no confidence score.
    const sharedProfile = {
      primary: session.primaryArchetype.id,
      secondary: session.secondaryArchetype.id,
    };

    return NextResponse.json({
      success: true,
      profile: sharedProfile
    });
  } catch (error: any) {
    console.error("Share Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
