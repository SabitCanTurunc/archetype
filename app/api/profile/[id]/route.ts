import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { TestSession } from "@/models/TestSession";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    await connectToDatabase();

    const session = await TestSession.findOne({ publicToken: id });

    if (!session) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Reconstruct the profile result structure expected by the frontend
    const profile = {
      dimensions: session.dimensions,
      primary: session.primaryArchetype,
      secondary: session.secondaryArchetype,
      confidence: session.confidence
    };

    return NextResponse.json({
      success: true,
      profile
    });
  } catch (error: any) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
