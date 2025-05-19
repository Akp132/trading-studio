import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Trading Studio</title>
        <meta name="description" content="Trading Studio Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8 gap-10">
        <h1 className="text-5xl font-extrabold text-blue-600">
          Welcome to Trading Studio 🚀
        </h1>
        <p className="text-gray-700 text-lg max-w-xl text-center">
          Create, Manage, and Simulate Your Trading Strategies with Ease.
        </p>
        <div className="flex gap-10">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            Get Started
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
            Learn More
          </button>
        </div>
      </main>
    </>
  );
}
