import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    name,
    birth_date,
    prize,
    phone,
    address,
    answer_1,
    answer_2,
    answer_3,
    latitude,
    longitude,
  } = body;

  if (!name || !birth_date || !phone || !address) {
    return NextResponse.json(
      { error: 'Data tidak lengkap' },
      { status: 400 }
    );
  }

  await sql`
    INSERT INTO claims (
      name, birth_date, prize,
      phone, address,
      answer_1, answer_2, answer_3,
      latitude, longitude
    ) VALUES (
      ${name}, ${birth_date}, ${prize},
      ${phone}, ${address},
      ${answer_1}, ${answer_2}, ${answer_3},
      ${latitude}, ${longitude}
    )
  `;

  return NextResponse.json({ success: true });
}