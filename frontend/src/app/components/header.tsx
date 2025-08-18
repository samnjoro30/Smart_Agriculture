"use client"

import { useState, useEffect} from 'react'
import Image from 'next/image';
import axiosInstance from '../API/axiosInstance';
// import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

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
            await axiosInstance.post("auth/logout")
            window.location.href = '/login';
        }catch(err){

        }
      };


    return(
        <div className="bg-green-200 shadow-green-400 sticky mb-5 rounded-b-10">
            <div className="max-w-7xl mx-auto px-1 py-4 flex items-center justify-between">
                <Image src="/logo.png" width={70} height={50} alt="logo" className="rounded-full"/>
                <h2 className="text-xl font-bold text-green-500">Smart Agriculture</h2>
                <button
                  className='bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-all duration-200'
                  onClick={toggleTheme}
                >
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
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