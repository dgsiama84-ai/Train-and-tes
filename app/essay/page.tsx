"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const QUESTIONS = [
  "Pertanyaan esai pertama kamu di sini?",
  "Pertanyaan esai kedua kamu di sini?",
  "Pertanyaan esai ketiga kamu di sini?",
];

function EssayForm() {
  const router = useRouter();
  const params = useSearchParams();
  const name = params.get("name") || "";
  const birthDate = params.get("birth_date") || "";

  const [answers, setAnswers] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allFilled = answers.every((a) => a.trim().length >= 10);

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (!allFilled) {
      setError("Semua jawaban wajib diisi minimal 10 karakter.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, birth_date: birthDate }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.winner) {
      router.push(
        `/result?status=win` +
        `&prize=${encodeURIComponent(data.prize)}` +
        `&name=${encodeURIComponent(name)}` +
        `&birth_date=${encodeURIComponent(birthDate)}` +
        `&a1=${encodeURIComponent(answers[0])}` +
        `&a2=${encodeURIComponent(answers[1])}` +
        `&a3=${encodeURIComponent(answers[2])}`
      );
    } else {
      router.push("/result?status=lose");
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F4FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
          <div className="w-5 h-1.5 bg-blue-600 rounded-full" />
          <div className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
        </div>

        <h1 className="text-3xl font-serif text-gray-900 mb-1">
          Cerita sedikit ✍️
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Jawab 3 pertanyaan di bawah ini
        </p>

        <div className="flex flex-col gap-4">
          {QUESTIONS.map((q, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors ${
                  answers[i].trim().length >= 10
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-50 text-blue-600"
                }`}>
                  {answers[i].trim().length >= 10 ? "✓" : i + 1}
                </div>
                <p className="text-xs font-medium text-gray-800 leading-relaxed">{q}</p>
              </div>
              <textarea
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="Tulis jawabanmu di sini..."
                maxLength={500}
                rows={3}
                className="w-full bg-[#F8F9FF] border border-[#E8EEFF] rounded-xl px-3 py-2.5 text-xs text-gray-700 placeholder-gray-300 outline-none focus:border-blue-400 transition-colors resize-none"
              />
              <div className="text-right text-[9px] mt-1">
                <span className={answers[i].length > 0 ? "text-blue-400" : "text-gray-300"}>
                  {answers[i].length}
                </span>
                <span className="text-gray-300"> / 500</span>
              </div>
            </div>
          ))}

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !allFilled}
            className="w-full bg-blue-600 text-white rounded-2xl py-4 text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-40 mt-2"
          >
            {loading ? "Menilai jawaban..." : "Kirim Jawaban →"}
          </button>
        </div>

      </div>
    </main>
  );
}

export default function EssayPage() {
  return (
    <Suspense>
      <EssayForm />
    </Suspense>
  );
}