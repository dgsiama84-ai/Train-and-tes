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
    doll_choice,
  } = body;

  if (!name || !birth_date || !phone || !address || !doll_choice) {
    return NextResponse.json(
      { error: 'Data tidak lengkap' },
      { status: 400 }
    );
  }

  const existing = await sql`
    SELECT id FROM claims WHERE name = ${name} AND birth_date = ${birth_date} LIMIT 1
  `;

  if (existing.length > 0) {
    return NextResponse.json(
      { error: 'Kamu sudah pernah klaim hadiah ini.' },
      { status: 409 }
    );
  }

  await sql`
    INSERT INTO claims (
      name, birth_date, prize,
      phone, address,
      answer_1, answer_2, answer_3,
      latitude, longitude,
      doll_choice
    ) VALUES (
      ${name}, ${birth_date}, ${prize},
      ${phone}, ${address},
      ${answer_1}, ${answer_2}, ${answer_3},
      ${latitude}, ${longitude},
      ${doll_choice}
    )
  `;

  return NextResponse.json({ success: true });
}