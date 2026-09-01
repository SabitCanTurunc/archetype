import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnswer {
  questionId: string;
  option: string;
  score: number;
}

export interface IDimensions {
  CONTROL: number;
  SOCIAL: number;
  DECISION: number;
  EMOTION: number;
}

export interface ITestSession extends Document {
  publicToken: string;
  answers: IAnswer[];
  dimensions: IDimensions;
  primaryArchetype: {
    id: string;
    similarity: number;
  };
  secondaryArchetype: {
    id: string;
    similarity: number;
  };
  confidence: number;
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  questionId: { type: String, required: true },
  option: { type: String, required: true },
  score: { type: Number, required: true },
});

const DimensionsSchema = new Schema<IDimensions>({
  CONTROL: { type: Number, required: true },
  SOCIAL: { type: Number, required: true },
  DECISION: { type: Number, required: true },
  EMOTION: { type: Number, required: true },
});

const TestSessionSchema = new Schema<ITestSession>(
  {
    publicToken: { type: String, required: true, unique: true },
    answers: { type: [AnswerSchema], required: true },
    dimensions: { type: DimensionsSchema, required: true },
    primaryArchetype: {
      id: { type: String, required: true },
      similarity: { type: Number, required: true },
    },
    secondaryArchetype: {
      id: { type: String, required: true },
      similarity: { type: Number, required: true },
    },
    confidence: { type: Number, required: true },
  },
  { timestamps: true }
);

export const TestSession: Model<ITestSession> =
  mongoose.models.TestSession || mongoose.model<ITestSession>("TestSession", TestSessionSchema);
