import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

// Navbar Component
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Trading Studio</h1>
        <div className="flex gap-6">
          <a href="#hero" className="text-gray-700 hover:text-blue-500 font-medium transition">Home</a>
          <a href="#features" className="text-gray-700 hover:text-blue-500 font-medium transition">Features</a>
          <Link href="/strategies" className="text-gray-700 hover:text-blue-500 font-medium transition">
            Strategies
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-gray-200 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Contact Us</h3>
          <p>Email: support@tradingstudio.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Market Street, NY</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#hero" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
            <li><a href="/strategies" className="hover:text-blue-400 transition">Strategies</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">About Trading Studio</h3>
          <p>Empowering traders to create, simulate, and analyze strategies with ease. Your success is our mission!</p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} Trading Studio. All Rights Reserved.
      </div>
    </footer>
  );
}

export default function Home() {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <>
      <Head>
        <title>Trading Studio</title>
      </Head>

      <Navbar />

      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          particles: {
            number: { value: 70 },
            size: { value: 5 },
            color: { value: "#60a5fa" },
            links: { enable: true, color: "#60a5fa" },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.7 },
          },
        }}
      />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-gray-100/80 p-8">
        {/* Hero Section */}
        <motion.section
          id="hero"
          className="text-center my-16 pt-24"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Trading Studio 🚀
          </motion.h1>
          <p className="text-gray-700 text-lg mb-8">
            Create, Manage, and Simulate Your Trading Strategies with Ease.
          </p>
          <motion.div
            className="flex gap-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link href="/strategies/create" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
              Get Started
            </Link>
            <Link href="/strategies" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition shadow-md">
              View Strategies
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            { icon: "📊", title: "Create", desc: "Design powerful trading strategies with our easy-to-use visual builder." },
            { icon: "🚀", title: "Simulate", desc: "Test and validate your strategies with historical market data." },
            { icon: "📈", title: "Analyze", desc: "Review performance metrics to optimize and improve your strategies." },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:scale-105 transition-transform cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {feature.icon} {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
