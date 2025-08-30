"use client"

import { useState, useEffect} from 'react'
import Image from 'next/image';
import { Sun, Moon, User, LogOut } from 'lucide-react';
import axiosInstance from '../API/axiosInstance';

export default function Header (){
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [userLetters, setUserLetters] = useState<string>('')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as "light" | "dark" | null;
        if(savedTheme){
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark' );
        }
    }, []);

    useEffect(() => {
        const Username =  async() =>{
            try{
                const res = await axiosInstance.get("/users/userprofile",{
                    withCredentials: true,
                });
                const name = res.data.message || 'user';

                const nameLetter = name.username;

                if (nameLetter >= 2){
                    setUserLetters(name.substring(0).toUpperCase());
                }else {
                    setUserLetters(nameLetter[0]?.toUpperCase() || 'U');

                }
            }catch(err){
                const error  = err instanceof Error ? err : new Error(String(err));
                console.error("Error retriving username letters", error);
            }
        }
        Username();
    }, [])

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
                <Image src="/logo.png" width={60} height={40} alt="logo" className="left-3 rounded-full"/>
                <h2 className="text-xl font-bold text-green-500">Smart Agriculture</h2>
                <div
                  className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-all duration-200"
                >{ 
                    userLetters || <User/>
                }
                </div>

                <button
                  className='bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-all duration-200'
                  onClick={toggleTheme}
                >
                    {theme === 'light' ?  < Moon/>: < Sun/>}
                </button>
                <button
                  className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm"
                  onClick={handleLogout}
                >
                    <LogOut size={18}/>
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </div>
    )
}