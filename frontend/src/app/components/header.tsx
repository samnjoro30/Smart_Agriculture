"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Sun, Moon, User, LogOut } from 'lucide-react'
import axiosInstance from '../API/axiosInstance'

export default function Header() {

  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [userLetters, setUserLetters] = useState('')

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const Username = async () => {
      try {
        const res = await axiosInstance.get("/farm/farm-profile", {
          withCredentials: true,
        })

        const username = res.data.farmer?.username || "User"

        if (username.length >= 2) {
          setUserLetters(username.substring(0,2).toUpperCase())
        } else {
          setUserLetters(username[0]?.toUpperCase() || "U")
        }

      } catch (err) {
        console.error("Error retrieving username letters", err)
      }
    }

    Username()
  }, [])

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout")
      window.location.href = '/auth/login'
    } catch (err) {
      console.error("Error occurred during logout", err)
    }
  }

  if (!mounted) return null

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
        <div className="flex items-center gap-2">

          {/* User */}
          <div className="flex items-center justify-center w-9 h-9 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
            {userLetters || <User size={18}/>}
          </div>

          {/* Theme Toggle */}
          <button
            className="flex items-center justify-center w-9 h-9 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}
          </button>

          {/* Logout */}
          <button
            className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full hover:from-green-600 hover:to-emerald-700 transition shadow-sm"
            onClick={handleLogout}
          >
            <LogOut size={16}/>
            <span className="hidden sm:block text-sm">Logout</span>
          </button>

        </div>

      </div>
    </header>
  )
}