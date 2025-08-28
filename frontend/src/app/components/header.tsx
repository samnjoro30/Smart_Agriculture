"use client"

import { useState, useEffect} from 'react'
import Image from 'next/image';
import { Sun, Moon } from 'lucide-react';
import axiosInstance from '../API/axiosInstance';

export default function Header (){
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as "light" | "dark" | null;
        if(savedTheme){
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark' );
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      };
      const handleLogout = async () => {
        try{
            await axiosInstance.post("/auth/logout")
            window.location.href = '/auth/login';
        }catch(err){
            const error = err instanceof Error ? err : new Error(String(err));
            console.error("Error occurred during logout", error);
        }
      };

    return(
        <div className="bg-green-200 shadow-green-400 sticky mb-1 rounded-b-xl">
            <div className="max-w-7xl mx-auto px-1 py-4 flex items-center justify-between">
                <Image src="/logo.png" width={60} height={40} alt="logo" className="rounded-full"/>
                <h2 className="text-xl font-bold text-green-500">Smart Agriculture</h2>
                <button
                  className='bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-all duration-200'
                  onClick={toggleTheme}
                >
                    {theme === 'light' ?  < Moon/>: < Sun/>}
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-all duration-200"
                  onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}