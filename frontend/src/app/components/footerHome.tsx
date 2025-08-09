
"use client"

import Link from 'next/link';
import {useState} from 'react';
import axiosInstance from '../API/axiosInstance';

interface FormData{
    email: string,
}

export default function FooterHome (){
    const [message, setMessage] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        email: '',
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData(prev => ({...prev,[name]: value}))
    }

    const handleSubmit = async() =>{
        try{
            const res = await axiosInstance.post("/newsletter/subscribe", formData);
            setMessage(res.data.message || 'Successfully subscribed to news letter')
        }catch(err){
            const error = err instanceof Error ? err : new Error(String(err));
            console.log("Error subscribing to newsletter", error);
        }
    }

    return(
        <footer className="bg-green-900 text-white py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-3">Smart Farm</h2>
                    <p className="text-sm">
                        Empowering farmers through innovative, AI-driven agriculture solutions. We bring technology closer to the soil.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                       <li><Link href="/" className="hover:underline">Home</Link></li>
                       <li><Link href="/auth/register" className="hover:underline">Register</Link></li>
                       <li><Link href="/auth/login" className="hover:underline">Login</Link></li>
                       <li><Link href="/" className="hover:underline">Services</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: samnjorokibandi@gmail.com</li>
                        <li>Phone: +254 799 169 720</li>
                        <li>Location: Nairobi, Kenya</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
                    <p className="text-sm mb-2">Stay updated with our latest features and insights.</p>
                    <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 rounded-md text-white-900 border-2 focus:outline-none"
                    />
                    <button className="mt-2 w-full bg-white text-green-900 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition">
                        Subscribe
                    </button>
                    </form>
                    {message && <p style={{ color: 'green'}}>{message}</p>}
                </div>
            </div>
        </footer>
    )
}