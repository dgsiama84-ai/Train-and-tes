"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#F0F4FF] flex flex-col items-center justify-center px-4 gap-6">

      <div className="flex gap-2 text-2xl">
        <span>🎉</span><span>🎊</span><span>✨</span>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">
          Klaim berhasil!
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Data kamu sudah kami terima.<br />
          Kami akan segera menghubungi kamu<br />
          melalui WhatsApp yang kamu berikan.
        </p>
      </div>

      <div className="w-full max-w-sm bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-sm flex-shrink-0">✅</div>
          <p className="text-xs text-gray-500 leading-relaxed">Data klaim sudah tersimpan di sistem kami.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-sm flex-shrink-0">📱</div>
          <p className="text-xs text-gray-500 leading-relaxed">Pantau WhatsApp kamu untuk konfirmasi pengiriman.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-sm flex-shrink-0">📦</div>
          <p className="text-xs text-gray-500 leading-relaxed">Hadiah akan dikirim dalam waktu 3-7 hari kerja.</p>
        </div>
      </div>

      <button
        onClick={() => router.push("/")}
        className="w-full max-w-sm bg-white border border-gray-200 text-gray-600 rounded-2xl py-4 text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        Kembali ke Halaman Utama
      </button>

    </main>
  );
}