import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Strategy {
  id: string;
  name: string;
  exchange: string;
  instrumentType: string;
}

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("strategies") || "[]");
    setStrategies(stored);
  }, []);

  const handleLoadStrategy = (strategyId: string) => {
    // Store the selected strategy ID in LocalStorage or State Management
    localStorage.setItem("selectedStrategyId", strategyId);
    // Redirect user to the Create Strategy page to edit
    window.location.href = "/strategies/create";
  };

  return (
    <>
      <Head>
        <title>Strategies</title>
      </Head>

      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Saved Strategies 📈</h1>

        {strategies.length === 0 ? (
          <p className="text-gray-600">No strategies saved yet. Go create one!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className="p-4 border rounded-lg shadow hover:bg-gray-50 transition flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{strategy.name}</h2>
                  <p className="text-gray-600 text-sm">
                    Exchange: {strategy.exchange} | Instrument: {strategy.instrumentType}
                  </p>
                </div>
                <button
                  onClick={() => handleLoadStrategy(strategy.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load/Edit
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/strategies/create"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            + Create New Strategy
          </Link>
        </div>
      </main>
    </>
  );
}
