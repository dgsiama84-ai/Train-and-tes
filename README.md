# Fun App — Iseng2 Berhadiah

Web app undian interaktif. Peserta mengisi nama dan tanggal lahir, menjawab 3 pertanyaan reflektif, lalu sistem menentukan apakah mereka menang atau tidak.

## Alur

1. Peserta masuk → isi nama & tanggal lahir
2. Jawab 3 pertanyaan esai
3. Sistem cek database → menang atau tidak
4. Jika menang → isi form klaim (pilih boneka, nomor WA, alamat)
5. Data tersimpan, hadiah dikirim

## Stack

- Next.js + TypeScript
- Tailwind CSS
- Neon PostgreSQL
- Vercel

## Database

- `winners` — daftar pemenang
- `claims` — data klaim hadiah
- `participants` — semua peserta & jawaban mereka