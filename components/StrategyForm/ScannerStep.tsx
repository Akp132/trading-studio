import RuleBuilder from "./RuleBuilder";

interface ScannerStepProps {
  exchange: string;
  setExchange: (value: string) => void;
  instrumentType: string;
  setInstrumentType: (value: string) => void;
  onTreeChange: (tree: any) => void;
}

export default function ScannerStep({
  exchange,
  setExchange,
  instrumentType,
  setInstrumentType,
  onTreeChange,
}: ScannerStepProps) {
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Scanner Configuration</h2>

      {/* Exchange Selector */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Select Exchange</label>
        <select
          value={exchange}
          onChange={(e) => setExchange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Exchange</option>
          <option value="NSE">NSE</option>
          <option value="BSE">BSE</option>
          <option value="NASDAQ">NASDAQ</option>
          <option value="NYSE">NYSE</option>
        </select>
      </div>

      {/* Instrument Type Selector */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">Select Instrument Type</label>
        <select
          value={instrumentType}
          onChange={(e) => setInstrumentType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type</option>
          <option value="EQUITY">Equity</option>
          <option value="ETF">ETF</option>
          <option value="BOND">Bond</option>
          <option value="OPTION">Option</option>
        </select>
      </div>

      {/* Rule Builder */}
      <RuleBuilder onTreeChange={onTreeChange} />
    </div>
  );
}
