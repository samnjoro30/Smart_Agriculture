'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { ChevronDown, Globe, LogOut, Moon, Sun, User, X } from 'lucide-react';
import axiosInstance from '../API/axiosInstance';
import { useUser } from '../lib/context/hook';

export default function Header() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userLetters, setUserLetters] = useState('');
  
  // State for menus (act as dropdowns on desktop, bottom sheets on mobile)
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
  const farmName = user?.farmname || 'My Farm'; 
  const farmerName = user?.username || 'Farmer';

  // Helper close handlers to reset states cleanly
  const closeAllMenus = () => {
    setDropdownOpen(false);
    setLangDropdownOpen(false);
  };

  return (
    <>
      <header className="bg-green-500 sticky top-0 mb-1 rounded-b-xl shadow-md z-40 active:scale-[0.99] transition-transform duration-100 ease-out md:active:scale-100">
        <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between h-14">
          
          {/* LEFT SIDE: App Identity */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.png"
              width={36}
              height={36}
              alt="logo"
              className="rounded-full shadow-sm border border-green-600"
            />
            <h2 className="text-base md:text-lg font-bold text-green-950 tracking-tight">
              {/* Shorter name on mobile screens to preserve layout line room */}
              <span className="sm:hidden">Smart Ag</span>
              <span className="hidden sm:inline">Smart Agriculture</span>
            </h2>
          </div>

          {/* RIGHT SIDE: App Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* 1. LANGUAGE SELECTOR */}
            <div className="relative">
              <button 
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 bg-green-600 text-white px-2.5 py-1.5 rounded-xl hover:bg-green-700 transition active:bg-green-800 text-xs md:text-sm font-medium shadow-sm"
              >
                <Globe size={16} />
                <span className="hidden sm:inline">{selectedLang}</span>
                <ChevronDown size={12} className="opacity-80" />
              </button>

              {/* Desktop Language Dropdown Menu */}
              {langDropdownOpen && (
                <div className="hidden md:block absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-1 text-gray-800 z-50">
                  {['English(en)', 'Kiswahili', 'Kikuyu'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangDropdownOpen(false);
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

            {/* 2. THEME & FARM CONTAINER */}
            <button
              className="flex items-center gap-2 md:gap-3 bg-green-600 text-white px-3 py-1.5 rounded-xl hover:bg-green-700 active:bg-green-800 transition text-xs md:text-sm font-medium shadow-sm max-w-[120px] sm:max-w-none"
              onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
            >
              <span className="truncate tracking-wide">{farmName}</span>
              <div className="border-l border-green-500/70 pl-1.5 flex-shrink-0">
                {currentTheme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </div>
            </button>

            {/* 3. USER PROFILE CONTROL */}
            <div className="relative">
              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1 md:gap-2 bg-green-600 text-white p-1 md:pl-1.5 md:pr-3 py-1 rounded-xl hover:bg-green-700 active:bg-green-800 transition shadow-sm"
              >
                <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-green-700 rounded-lg text-xs md:text-sm font-bold shadow-inner flex-shrink-0">
                  {userLetters || <User size={14} />}
                </div>
                
                <span className="text-sm font-semibold max-w-[80px] truncate hidden md:inline">
                  {farmerName}
                </span>
                <ChevronDown size={12} className="text-green-200 hidden sm:block" />
              </button>

              {/* Desktop Profile Dropdown Menu */}
              {dropdownOpen && (
                <div className="hidden md:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 text-gray-800 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-semibold"
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

      {/* ========================================================================= */}
      {/* MOBILE APP INTERACTIVE LAYOUT ELEMENTS (BOTTOM DRAWER BOTTOM SHEETS)       */}
      {/* ========================================================================= */}
      
      {/* Backdrop overlay filter layer */}
      {(langDropdownOpen || dropdownOpen) && (
        <div 
          onClick={closeAllMenus}
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity animate-in fade-in duration-200" 
        />
      )}

      {/* A. Mobile Language Bottom Sheet Drawer */}
      <div className={`md:hidden fixed bottom-0 inset-x-0 bg-white rounded-t-2xl shadow-2xl z-50 p-5 transform transition-transform duration-300 ease-out border-t border-gray-100 ${
        langDropdownOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Pull tab handle accessory indicator */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Globe size={18} className="text-green-600" /> Choose Language
          </h3>
          <button onClick={closeAllMenus} className="p-1 rounded-full bg-gray-100 text-gray-500 active:bg-gray-200">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-2">
          {['English(en)', 'Kiswahili', 'Kikuyu'].map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setSelectedLang(lang);
                closeAllMenus();
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition active:scale-[0.99] ${
                selectedLang === lang 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-gray-50 text-gray-700 border border-transparent active:bg-gray-100'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* B. Mobile User Profile Actions Bottom Sheet Drawer */}
      <div className={`md:hidden fixed bottom-0 inset-x-0 bg-white rounded-t-2xl shadow-2xl z-50 p-5 transform transition-transform duration-300 ease-out border-t border-gray-100 ${
        dropdownOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-700 rounded-xl text-base font-bold">
              {userLetters || <User size={18} />}
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Logged in as</p>
              <p className="text-base font-bold text-gray-800">{farmerName}</p>
            </div>
          </div>
          <button onClick={closeAllMenus} className="p-1 rounded-full bg-gray-100 text-gray-500 active:bg-gray-200">
            <X size={18} />
          </button>
        </div>
        
        <button
          onClick={() => {
            closeAllMenus();
            handleLogout();
          }}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:bg-red-700 transition active:scale-[0.99] shadow-sm"
        >
          <LogOut size={18} />
          Logout From Account
        </button>
      </div>
    </>
  );
}