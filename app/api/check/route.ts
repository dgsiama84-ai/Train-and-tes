import { NextRequest, NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, birth_date, answer_1, answer_2, answer_3 } = body;

  if (!name || !birth_date) {
    return NextResponse.json(
      { error: 'Nama dan tanggal lahir wajib diisi' },
      { status: 400 }
    );
  }

  await sql`
    INSERT INTO participants (name, birth_date, answer_1, answer_2, answer_3)
    VALUES (${name}, ${birth_date}, ${answer_1 || null}, ${answer_2 || null}, ${answer_3 || null})
  `;

  const result = await sql`
    SELECT * FROM winners
    WHERE LOWER(name) = LOWER(${name})
    AND birth_date = ${birth_date}
    LIMIT 1
  `;

  if (result.length === 0) {
    return NextResponse.json({ winner: false });
  }

  return NextResponse.json({
    winner: true,
    prize: result[0].prize,
  });
}