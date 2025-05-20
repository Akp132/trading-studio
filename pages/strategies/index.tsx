import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

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
    localStorage.setItem("selectedStrategyId", strategyId);
    window.location.href = "/strategies/create";
  };

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <>
      <Head>
        <title>Saved Strategies</title>
      </Head>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          particles: {
            number: { value: 60 },
            size: { value: 4 },
            color: { value: "#60a5fa" },
            links: { enable: true, color: "#60a5fa" },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.7 },
          },
        }}
      />

      <main className="relative z-10 max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
          <span role="img" aria-label="chart">📊</span> Your Saved Strategies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategies.length === 0 ? (
            <p className="text-gray-600">No strategies saved yet. Go create one!</p>
          ) : (
            strategies.map((strategy) => (
              <div
                key={strategy.id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-gray-800">{strategy.name || "Untitled Strategy"}</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Exchange: {strategy.exchange || "-"} | Instrument: {strategy.instrumentType || "-"}
                </p>
                <button
                  onClick={() => handleLoadStrategy(strategy.id)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                >
                  Load & Edit
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/strategies/create"
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition shadow"
          >
            + Create New Strategy
          </Link>
        </div>
      </main>
    </>
  );
}
