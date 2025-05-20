import Head from "next/head";
import StrategyForm from "@/components/StrategyForm/StrategyForm";
import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

export default function CreateStrategyPage() {
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const id = localStorage.getItem("selectedStrategyId");
    if (id) {
      const all = JSON.parse(localStorage.getItem("strategies") || "[]");
      const found = all.find((s: any) => s.id === id);
      if (found) setInitialData(found);
      localStorage.removeItem("selectedStrategyId"); // clean up
    }
  }, []);

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <>
      <Head>
        <title>Create a New Strategy</title>
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

      <main className="relative z-10 max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">✨ Create a New Strategy</h1>
        <StrategyForm initialData={initialData} />
      </main>
    </>
  );
}
