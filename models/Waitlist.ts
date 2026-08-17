import mongoose from 'mongoose';

export interface IWaitlist extends mongoose.Document {
  email: string;
  createdAt: Date;
}

const WaitlistSchema = new mongoose.Schema<IWaitlist>({
  email: {
    type: String,
    required: [true, 'Lütfen geçerli bir e-posta adresi girin.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Lütfen geçerli bir e-posta adresi girin.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Waitlist || mongoose.model<IWaitlist>('Waitlist', WaitlistSchema);
