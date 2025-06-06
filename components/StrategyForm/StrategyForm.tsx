import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ScannerStep from "./ScannerStep";
import RuleBuilder from "./RuleBuilder";
import { v4 as uuidv4 } from "uuid";

type RuleNode = any;

interface StrategyFormProps {
  initialData?: {
    id?: string;
    name: string;
    exchange: string;
    instrumentType: string;
    scannerRules: RuleNode;
    buyRules: RuleNode;
    sellRules: RuleNode;
  };
}

export default function StrategyForm({ initialData }: StrategyFormProps) {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const [strategyId, setStrategyId] = useState<string | null>(initialData?.id || null);
  const [strategyName, setStrategyName] = useState<string>(initialData?.name || "");
  const [exchange, setExchange] = useState<string>(initialData?.exchange || "");
  const [instrumentType, setInstrumentType] = useState<string>(initialData?.instrumentType || "");
  const [scannerRules, setScannerRules] = useState<any>(initialData?.scannerRules || null);
  const [buyRules, setBuyRules] = useState<any>(initialData?.buyRules || null);
  const [sellRules, setSellRules] = useState<any>(initialData?.sellRules || null);

  useEffect(() => {
    if (initialData) return;

    const selectedId = localStorage.getItem("selectedStrategyId");
    if (!selectedId) return;

    const stored = JSON.parse(localStorage.getItem("strategies") || "[]");
    const selectedStrategy = stored.find((s: any) => s.id === selectedId);

    if (selectedStrategy) {
      setStrategyId(selectedStrategy.id);
      setStrategyName(selectedStrategy.name);
      setExchange(selectedStrategy.exchange);
      setInstrumentType(selectedStrategy.instrumentType);
      setScannerRules(selectedStrategy.scannerRules);
      setBuyRules(selectedStrategy.buyRules);
      setSellRules(selectedStrategy.sellRules);
    }

    localStorage.removeItem("selectedStrategyId");
  }, [initialData]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const strategyData = {
    id: strategyId || uuidv4(),
    name: strategyName || "Untitled Strategy",
    exchange,
    instrumentType,
    scannerRules,
    buyRules,
    sellRules,
  };

  const isStepValid = () => {
    if (step === 1) {
      return (
        strategyName.trim() !== "" &&
        exchange.trim() !== "" &&
        instrumentType.trim() !== "" &&
        scannerRules &&
        scannerRules.children &&
        scannerRules.children.length > 0
      );
    }
    return true;
  };

  const saveToLocalStorage = () => {
    const existing = JSON.parse(localStorage.getItem("strategies") || "[]");
    const updatedStrategies = strategyId
      ? existing.map((s: any) => (s.id === strategyId ? strategyData : s))
      : [...existing, strategyData];

    localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
    alert("Strategy saved successfully!");
    router.push("/strategies");
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(strategyData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${strategyData.name}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  return (
    <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Strategy Creation Wizard</h2>

      <div className="flex justify-between mb-8">
        {["Scanner", "Buy", "Sell", "Review"].map((label, index) => (
          <div
            key={index}
            className={`flex-1 text-center ${step === index + 1 ? "font-bold text-blue-600" : "text-gray-500"}`}
          >
            {label}
          </div>
        ))}
      </div>

      {step === 1 && (
        <>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Strategy Name</label>
            <input
              type="text"
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              placeholder="Enter strategy name..."
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <ScannerStep
            exchange={exchange}
            setExchange={setExchange}
            instrumentType={instrumentType}
            setInstrumentType={setInstrumentType}
            onTreeChange={setScannerRules}
          />

          {!isStepValid() && (
            <p className="text-sm text-red-500 mt-4">
              Please fill in all fields and add at least one rule to continue.
            </p>
          )}
        </>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Buy Conditions 📈</h3>
          <RuleBuilder onTreeChange={setBuyRules} />
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sell Conditions 📉</h3>
          <RuleBuilder onTreeChange={setSellRules} />
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Strategy Review 📋</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto max-h-96 text-sm">
            {JSON.stringify(strategyData, null, 2)}
          </pre>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleExport}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              📥 Download JSON
            </button>
            <button
              onClick={saveToLocalStorage}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              💾 Save Strategy
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          >
            ⬅ Previous
          </button>
        )}
        {step < 4 && (
          <button
            onClick={nextStep}
            disabled={!isStepValid()}
            className={`ml-auto px-6 py-3 rounded-lg transition-colors shadow-md ${
              isStepValid()
                ? "bg-blue-500 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next ➡
          </button>
        )}
      </div>
    </div>
  );
}
