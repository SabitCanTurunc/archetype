import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Waitlist from '@/models/Waitlist';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email adresi gereklidir.' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if email already exists
    const existingEntry = await Waitlist.findOne({ email });
    
    if (existingEntry) {
      return NextResponse.json(
        { message: 'Bu e-posta zaten kayıtlı.', success: true },
        { status: 200 }
      );
    }

    await Waitlist.create({ email });

    return NextResponse.json(
      { message: 'Başarıyla kaydedildi.', success: true },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
