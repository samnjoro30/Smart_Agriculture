'use client';

import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import axiosInstance from '../API/axiosInstance';

interface FormData {
  email: string;
}

export default function FooterHome() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await axiosInstance.post(
        '/auth/newsletter/subscribe',
        formData
      );
      setMessage(res.data.message || 'Successfully subscribed to news letter');
      setFormData({ email: '' });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail ||
        'Error subscribing to newsletter, Try again later!';
      setError(errorMessage);
      console.log('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer 
      className="relative w-full" 
      style={{ 
        backgroundImage: "url('/footer.svg')", 
        backgroundSize: 'cover',
      }}
      > 
      {/* Container with rounded corners as seen in the reference images */}
      <div className="max-w-7xl mx-auto rounded-t-3xl overflow-hidden relative bg-green-900  text-white">

        <div className="px-8 pt-16 pb-12 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full bg-white p-1"
              />
              <h2 className="text-2xl text-white font-bold leading-tight">
                Smart Farm<br/>Agriculture
              </h2>
            </div>
            <p className="text-sm opacity-80 max-w-xs text-white">
              Empowering farmers through innovative, AI-driven agriculture
              solutions. We bring technology closer to the soil.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="text-white"><Link href="/" className="hover:text-yellow-200 transition">Home</Link></li>
              <li className="text-white"><Link href="/auth/register" className="hover:text-yellow-200 transition">Register</Link></li>
              <li className="text-white"><Link href="/auth/login" className="hover:text-yellow-200 transition">Login</Link></li>
              <li className="text-white" ><Link href="/" className="hover:text-yellow-200 transition">Services</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-5">Contact</h3>
            <div className="space-y-4 text-sm opacity-90">
              <div>
                <p className="font-bold text-white">Email:</p>
                <p className="text-white">samnjorokibandi@gmail.com</p>
              </div>
              <div>
                <p className="font-bold text-white">Phone:</p>
                <p className="text-white">+254 799 169 720</p>
              </div>
              <div>
                <p className="font-bold text-white">Location:</p>
                <p className="text-white">Nairobi, Kenya</p>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-5">Newsletter</h3>
            <p className="text-sm text-white opacity-80 mb-4">
              Stay updated with our latest features and insights.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent border border-white/30 rounded-xl focus:outline-none focus:border-white transition"
              />
              <button
                type="submit"
                className="w-full bg-white text-[#1a4331] font-bold py-3 rounded-xl hover:bg-gray-100 transition"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      </div>
    </footer>
  );

}
