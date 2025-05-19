import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Trading Studio</h1>
      <div className="flex gap-8">
        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
          Home
        </Link>
        <Link href="/strategies" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
          Strategies
        </Link>
        <Link href="/strategies/create" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
          Create Strategy
        </Link>
      </div>
    </nav>
  );
}
