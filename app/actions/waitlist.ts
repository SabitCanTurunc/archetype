'use server';

import dbConnect from '@/lib/mongodb';
import Waitlist from '@/models/Waitlist';

export async function getWaitlistEntries() {
  try {
    await dbConnect();
    const entries = await Waitlist.find().sort({ createdAt: -1 }).lean();
    
    return entries.map(entry => ({
      _id: entry._id.toString(),
      email: entry.email,
      createdAt: entry.createdAt.toISOString()
    }));
  } catch (error) {
    console.error('Failed to fetch waitlist:', error);
    return [];
  }
}
