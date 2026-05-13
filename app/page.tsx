"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !birthDate) {
      setError("Nama dan tanggal lahir wajib diisi.");
      return;
    }

    router.push(
      `/essay?name=${encodeURIComponent(name)}&birth_date=${encodeURIComponent(birthDate)}`
    );
  };

  return (
    <main className="min-h-screen bg-[#F0F4FF] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-1.5 bg-blue-600 rounded-full" />
          <div className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
          <div className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
        </div>

        <h1 className="text-3xl font-serif text-gray-900 mb-1">
          Hai selamat datang 👋
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Isi data diri dulu ya
        </p>

        <div className="flex flex-col gap-4">

          <div>
            <label className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest mb-1.5 block">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest mb-1.5 block">
              Tanggal Lahir
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-800 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <div className="bg-blue-50 rounded-xl px-4 py-3 flex gap-2 items-start">
            <span className="text-blue-500 text-sm mt-0.5">ℹ️</span>
            <p className="text-xs text-blue-500 leading-relaxed">
              Pastikan nama dan tanggal lahir sesuai dengan data asli kamu.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white rounded-2xl py-4 text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors mt-2"
          >
            Lanjutkan →
          </button>

        </div>
      </div>
    </main>
  );
}