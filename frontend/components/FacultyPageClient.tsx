"use client";

import { useState } from "react";
import FACULTIES from "../data/faculties";

type Props = { house: string };

export default function FacultyPageClient({ house }: Props) {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  async function fetchHouse() {
    if (!house) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/api/characters/house/${house}`);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`${res.status} ${res.statusText} ${text}`);
      }
      const data = await res.json();
      setCharacters(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch. Open browser devtools (Network/Console) for details.");
    } finally {
      setLoading(false);
    }
  }

  const meta = FACULTIES[house] ?? {
    displayName: house ? house[0].toUpperCase() + house.slice(1) : "Faculty",
    bgClass: "bg-gray-900 text-white",
    description: `${house ? house[0].toUpperCase() + house.slice(1) : "Faculty"} values and characters.`,
  };

  return (
    <section className={`${meta.bgClass} min-h-screen p-8`}>
      <h1 className="text-4xl font-bold mb-4">{meta.displayName}</h1>
      <p className="mb-4">{meta.description}</p>

      <div className="mt-2">
        <button
          onClick={fetchHouse}
          className="bg-yellow-400 text-red-900 font-bold px-4 py-2 rounded"
          disabled={loading || !house}
        >
          {loading ? "Loading..." : `Load ${meta.displayName} Characters`}
        </button>
      </div>

      {error && <p className="mt-4 text-yellow-200">Error: {error}</p>}

      {characters && (
        <ul className="mt-6 space-y-3 text-black bg-white/10 p-4 rounded max-w-2xl">
          {characters.map((c: any) => (
            <li key={c.name} className="p-2 border-b border-white/10 flex items-center justify-between">
              <div className="min-w-0">
                <div className="font-semibold truncate">{c.name}</div>
                <div className="text-sm text-gray-200 truncate">patronus: {c.patronus ?? "unknown"}</div>
              </div>
              {c.image ? (
                <img
                  src={c.image}
                  alt={c.name + " image"}
                  className="w-16 h-16 object-cover rounded ml-4 flex-shrink-0"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded ml-4 flex-shrink-0 flex items-center justify-center bg-white/10 text-current text-2xl"
                  aria-hidden
                >
                  {meta.symbol ?? "🪄"}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
