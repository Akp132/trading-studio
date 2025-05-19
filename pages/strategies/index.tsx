import Head from "next/head";
import Link from "next/link";

export default function Strategies() {
  return (
    <>
      <Head>
        <title>Strategies</title>
      </Head>

      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Saved Strategies 📈</h1>

        <div className="flex flex-col gap-4">
          {/* Placeholder Strategies */}
          <Link
            href="/strategies/1"
            className="p-4 border rounded-lg shadow hover:bg-gray-50 transition"
          >
            Strategy #1 - Breakout Scanner
          </Link>
          <Link
            href="/strategies/2"
            className="p-4 border rounded-lg shadow hover:bg-gray-50 transition"
          >
            Strategy #2 - Moving Average Crossover
          </Link>
        </div>

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
