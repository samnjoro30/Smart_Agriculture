'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import Image from 'next/image';

import { ChevronDown, Globe, LogOut, Moon, Sun, User } from 'lucide-react';

import axiosInstance from '../API/axiosInstance';
import { useUser } from '../lib/context/hook';

export default function Header() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userLetters, setUserLetters] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: user, isLoading } = useUser();
  useEffect(() => {
    if (!user?.username) {
      setUserLetters('');
      return;
    }

    const parts = user.username.trim().split(' ');

    let letters =
      parts.length === 1 ? parts[0].substring(0, 2) : parts[0][0] + parts[1][0];

    setUserLetters(letters.toUpperCase());
  }, [user]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (err) {
      console.error('Error occurred during logout', err);
    } finally {
      window.location.replace('/auth/login');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <header className="bg-green-500 sticky top-0 mb-1 rounded-b-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
        {/* LEFT SIDE (Logo + Title) */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="logo"
            className="rounded-full"
          />

          <h2 className="text-lg font-bold text-green-900">
            Smart Agriculture
          </h2>
        </div>

        {/* RIGHT SIDE (Icons grouped closely) */}
        <div className="flex items-center gap-3">
          {/* User */}
          {/* <div className="flex items-center justify-center w-9 h-9 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
            {userLetters || <User size={18}/>}
          </div> */}
          <button className="flex items-center justify-center w-9 h-9 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
            <Globe size={18} />
          </button>

          {/* Theme Toggle */}
          <button
            className="flex items-center justify-center w-9 h-9 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            onClick={() =>
              setTheme(currentTheme === 'light' ? 'dark' : 'light')
            }
          >
            {currentTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-green-700 rounded-full text-sm font-bold">
                {userLetters || <User size={16} />}
              </div>

              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-green-500 rounded-lg shadow-lg border">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm rounded-full hover:bg-green-400"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
