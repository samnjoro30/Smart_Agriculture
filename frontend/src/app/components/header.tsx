'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import Image from 'next/image';

import { ChevronDown, Globe, LogOut, Moon, Sun, User } from 'lucide-react';

import axiosInstance from '../API/axiosInstance';
import { useUser } from '../lib/context/hook';
import { dataTagErrorSymbol } from '@tanstack/react-query';

export default function Header() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userLetters, setUserLetters] = useState('');
  
  // State for dropdowns
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English(en)');

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

  // Safe fallbacks for API data strings
  const farmName = user?.farmname || 'My Farm'; 
  
  console.log('Fetched farm name:', farmName); // Debug log for farm name
  const farmerName = user?.username || 'Farmer';

  return (
    <header className="bg-green-500 sticky top-0 mb-1 rounded-b-xl shadow-sm z-50">
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
          <h2 className="text-lg font-bold text-green-900 hidden sm:block">
            Smart Agriculture
          </h2>
        </div>

        {/* RIGHT SIDE (Controls & Profiles) */}
        <div className="flex items-center gap-4">
          
          {/* 1. LANGUAGE DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setDropdownOpen(false);
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition shadow-sm text-sm"
            >
              <Globe size={18} />
              <span className="hidden md:inline">{selectedLang}</span>
              <ChevronDown size={14} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-1 text-gray-800 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                {['English(en)', 'Kiswahili', 'Kikuyu'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangDropdownOpen(false);
                      // TODO: hook up your i18n/translation change function here
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition hover:bg-green-50 ${
                      selectedLang === lang ? 'font-semibold text-green-600 bg-green-50' : ''
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. THEME TOGGLE (Farm Name Box Container) */}
          <button
            className="flex items-center gap-3 bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition shadow-sm"
            onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
            title="Toggle theme"
          >
            <span className="text-sm font-medium tracking-wide">{farmName}</span>
            <div className="border-l border-green-500 pl-2">
              {currentTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </div>
          </button>

          {/* 3. USER PROFILE & LOGOUT DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-2 bg-green-600 text-white pl-2 pr-3 py-1 rounded-lg hover:bg-green-700 transition shadow-sm"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-green-700 rounded-full text-sm font-bold shadow-inner">
                {userLetters || <User size={16} />}
              </div>
              
              {/* Display Farmer Name dynamically */}
              <span className="text-sm font-medium max-w-[100px] truncate hidden sm:inline">
                {farmerName} 
              </span>

              <ChevronDown size={14} className="text-green-200" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 text-gray-800 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-semibold truncate">{farmerName}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-medium"
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