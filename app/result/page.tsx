"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResultContent() {
  const router = useRouter();
  const params = useSearchParams();

  const status = params.get("status");
  const prize = params.get("prize") || "";
  const name = params.get("name") || "";
  const birthDate = params.get("birth_date") || "";
  const a1 = params.get("a1") || "";
  const a2 = params.get("a2") || "";
  const a3 = params.get("a3") || "";

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowResult(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Loading screen
  if (!showResult) {
    return (
      <main className="min-h-screen bg-[#F8F9FF] flex flex-col items-center justify-center px-4 gap-6">
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-3xl">
            ✨
          </div>
          <div className="absolute w-24 h-24 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-serif text-gray-900 mb-2">
            Sedang menilai<br />jawabanmu...
          </h2>
          <p className="text-sm text-gray-400">
            Sistem kami sedang memverifikasi<br />setiap jawaban yang kamu berikan
          </p>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-blue-200 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </main>
    );
  }

  // Lose screen
  if (status === "lose") {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4 gap-6">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-4xl">
          ☁️ 
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-serif text-gray-900 mb-2">
            Sayang sekali, Belum beruntung<br />kali ini
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Jangan menyerah!<br />Coba di lain kesempatan🌱
          </p>
        </div>
        <div className="w-full max-w-sm bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-sm flex-shrink-0">💡</div>
            <p className="text-xs text-gray-500 leading-relaxed">Pastikan nama ditulis lengkap sesuai data asli.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-sm flex-shrink-0">🕐</div>
            <p className="text-xs text-gray-500 leading-relaxed">Pantau terus info terbaru dari kami.</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className="w-full max-w-sm bg-white border border-gray-200 text-gray-700 rounded-2xl py-4 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          ↩ Coba Lagi
        </button>
      </main>
    );
  }

    // Win screen
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 gap-6">
      
      {/* Focal Point: Single Animated Icon */}
      <div className="w-24 h-24 rounded-3xl bg-green-50 flex items-center justify-center text-4xl animate-bounce">
        🎁
      </div>

      {/* Clean Pill Badge */}
      <div className="bg-green-50 border border-green-100 rounded-full px-6 py-2">
        <span className="text-xs font-bold text-green-700 uppercase tracking-widest">
          Special Reward Unlocked
        </span>
      </div>

      {/* Text Section */}
      <div className="text-center">
        <h2 className="text-2xl font-serif text-gray-900 mb-2">
          Kamu terpilih<br />mendapat hadiah
        </h2>
        <p className="text-sm text-gray-400">
          Segera klaim hadiahmu sebelum kedaluwarsa.
        </p>
      </div>

      {/* Prize Box (Lebih lega dan shadow tipis) */}
      <div className="w-full max-w-sm bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
          🎁
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Hadiahmu</p>
          <p className="text-sm font-semibold text-gray-900">{prize}</p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() =>
          router.push(
            `/claim?name=${encodeURIComponent(name)}` +
            `&birth_date=${encodeURIComponent(birthDate)}` +
            `&prize=${encodeURIComponent(prize)}` +
            `&a1=${encodeURIComponent(a1)}` +
            `&a2=${encodeURIComponent(a2)}` +
            `&a3=${encodeURIComponent(a3)}`
          )
        }
        className="w-full max-w-sm bg-blue-600 text-white rounded-2xl py-4 text-sm font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
      >
        Klaim Hadiah Sekarang →
      </button>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}
