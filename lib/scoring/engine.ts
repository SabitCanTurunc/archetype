import { questions, Option } from "../data/questions";
import { archetypes, Archetype } from "../data/archetypes";

export interface AnswerInput {
  questionId: string;
  option: string;
}

export interface ProfileResult {
  dimensions: {
    CONTROL: number;
    SOCIAL: number;
    DECISION: number;
    EMOTION: number;
  };
  primary: {
    id: string;
    name: { en: string; tr: string };
    similarity: number;
  };
  secondary: {
    id: string;
    name: { en: string; tr: string };
    similarity: number;
  };
  confidence: number;
}

export function calculateProfile(answers: AnswerInput[]): ProfileResult {
  // Validate we have 12 unique answers
  const answeredQuestionIds = new Set(answers.map((a) => a.questionId));
  if (answeredQuestionIds.size !== 12 || answers.length !== 12) {
    throw new Error("Exactly 12 unique answers are required.");
  }

  const dimensionScores: Record<string, number[]> = {
    CONTROL: [],
    SOCIAL: [],
    DECISION: [],
    EMOTION: [],
  };

  // 1. Map answers to scores
  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) {
      throw new Error(`Invalid question ID: ${answer.questionId}`);
    }

    const option = question.options.find((o) => o.id === answer.option);
    if (!option) {
      throw new Error(`Invalid option ${answer.option} for question ${answer.questionId}`);
    }

    dimensionScores[question.dimension].push(option.score);
  }

  // 2. Calculate dimension averages and normalize
  const dimensions = {
    CONTROL: normalizeScore(calculateAverage(dimensionScores.CONTROL)),
    SOCIAL: normalizeScore(calculateAverage(dimensionScores.SOCIAL)),
    DECISION: normalizeScore(calculateAverage(dimensionScores.DECISION)),
    EMOTION: normalizeScore(calculateAverage(dimensionScores.EMOTION)),
  };

  // 3. Archetype Matching (Manhattan Distance)
  const similarities = archetypes.map((archetype) => {
    const distance = Math.abs(dimensions.CONTROL - archetype.vector.CONTROL)
      + Math.abs(dimensions.SOCIAL - archetype.vector.SOCIAL)
      + Math.abs(dimensions.DECISION - archetype.vector.DECISION)
      + Math.abs(dimensions.EMOTION - archetype.vector.EMOTION);
    
    // Max distance is 400 (4 * 100)
    const similarity = Math.round(100 - ((distance / 400) * 100));
    
    return {
      archetype,
      similarity,
    };
  });

  // Sort descending by similarity
  similarities.sort((a, b) => b.similarity - a.similarity);

  const primaryMatch = similarities[0];
  const secondaryMatch = similarities[1];

  // 4. Calculate Confidence
  const gap = primaryMatch.similarity - secondaryMatch.similarity;
  let confidence = 50 + (gap * 2);
  confidence = Math.max(50, Math.min(99, confidence)); // clamp to 50-99

  return {
    dimensions,
    primary: {
      id: primaryMatch.archetype.id,
      name: primaryMatch.archetype.name,
      similarity: primaryMatch.similarity,
    },
    secondary: {
      id: secondaryMatch.archetype.id,
      name: secondaryMatch.archetype.name,
      similarity: secondaryMatch.similarity,
    },
    confidence,
  };
}

function calculateAverage(scores: number[]): number {
  if (scores.length === 0) return 1;
  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length;
}

// Formula: normalized = ((average - 1) / 4) * 100
function normalizeScore(average: number): number {
  return Math.round(((average - 1) / 4) * 100);
}
