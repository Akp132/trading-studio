import Head from "next/head";
import StrategyForm from "@/components/StrategyForm/StrategyForm";

export default function CreateStrategy() {
  return (
    <>
      <Head>
        <title>Create Strategy</title>
      </Head>

      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Create New Strategy ✨</h1>

        {/* Multi-Step Strategy Form */}
        <StrategyForm />
      </main>
    </>
  );
}
