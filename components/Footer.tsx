'use client';
import Link from "next/link";

export default function Footer() {
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
            <li>
              <a href="#hero" className="hover:text-blue-400 transition">Home</a>
            </li>
            <li>
              <a href="#features" className="hover:text-blue-400 transition">Features</a>
            </li>
            <li>
              <Link href="/strategies" className="hover:text-blue-400 transition">Strategies</Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">About Trading Studio</h3>
          <p>
            Empowering traders to create, simulate, and analyze strategies with ease. Your success is our mission!
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} Trading Studio. All Rights Reserved.
      </div>
    </footer>
  );
}
