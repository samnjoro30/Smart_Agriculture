"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function HeaderHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-green-50 shadow-md sticky top-0 z-50 rounded-bl-3xl rounded-br-3xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-xl md:text-2xl font-bold text-green-700">Smart Farm Agriculture</h1>
        </div>
        <button
          className="md:hidden text-green-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav>
            <ul className="hidden md:flex space-x-6 text-green-800 font-medium">
                <li><Link href="/" className="hover:text-green-600 transition-colors duration-200"> Home </Link></li>
                <li><Link href="#services" className="hover:text-green-600 transition-colors duration-200">Services </Link> </li>
                <li><Link href="#impact" className="hover:text-green-600 transition-colors duration-200">Impact </Link></li>
                <li> <Link href="/auth/login" prefetch={true} className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-all duration-200">Login</Link></li>
                <li> <Link href="/auth/register" prefetch={true} className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-all duration-200" > Register </Link> </li>
                <li> <Link href="#contact" className="hover:text-green-600 transition-colors duration-200">Contact</Link></li>
            </ul>
        </nav>
        {menuOpen && (
          <nav className="md:hidden px-6 pb-4 text-green-800 font-medium space-y-2 bg-green-50 rounded-b-3xl">
            <Link href="/" className="block hover:text-green-600">Home</Link>
            <Link href="#services" className="block hover:text-green-600">Services</Link>
            <Link href="#impact" className="block hover:text-green-600">Impact</Link>
            <Link href="/auth/login" prefetch={true} className="block hover:text-green-600">Login</Link>
            <Link href="/auth/register"  prefetch={true} className="block hover:text-green-600">Register</Link>
            <Link href="#contact" className="block hover:text-green-600">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
