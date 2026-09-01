import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { TestSession } from "@/models/TestSession";
import { calculateProfile, AnswerInput } from "@/lib/scoring/engine";
import { questions } from "@/lib/data/questions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const answers: AnswerInput[] = body.answers;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid answers format" }, { status: 400 });
    }

    if (answers.length !== 12) {
      return NextResponse.json({ error: "Exactly 12 answers are required" }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Compute profile
    let profileResult;
    try {
      profileResult = calculateProfile(answers);
    } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }

    // Map answers to include score for DB saving
    const fullAnswers = answers.map((ans) => {
      const q = questions.find((q) => q.id === ans.questionId);
      const opt = q?.options.find((o) => o.id === ans.option);
      return {
        questionId: ans.questionId,
        option: ans.option,
        score: opt?.score || 0,
      };
    });

    // Save to DB
    const publicToken = crypto.randomUUID();
    const session = await TestSession.create({
      publicToken,
      answers: fullAnswers,
      dimensions: profileResult.dimensions,
      primaryArchetype: {
        id: profileResult.primary.id,
        similarity: profileResult.primary.similarity,
      },
      secondaryArchetype: {
        id: profileResult.secondary.id,
        similarity: profileResult.secondary.similarity,
      },
      confidence: profileResult.confidence,
    });

    return NextResponse.json({
      success: true,
      sessionId: session._id,
      publicToken: session.publicToken,
      profile: profileResult,
    });
  } catch (error: any) {
    console.error("Profile API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
