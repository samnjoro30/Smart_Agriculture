"use client"

import { useState, useEffect} from 'react'
import Image from 'next/image';

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

      const handleLogout = () => {
        // Clear auth token / call logout API
        window.location.href = '/login'; // redirect to login
      };


    return(
        <div>
            <div>
                <Image src="logo.png" width={70} height={50} alt="logo"/>
                <h2>Smart Agriculture</h2>
                <button
                 onClick={toggleTheme}
                >
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
                <button
                  onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}