"use client"

import React, { useState } from 'react';
import axiosInstance from '../../API/axiosInstance';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { EyeOff, Eye } from 'lucide-react';

interface FormData {
  email: string,
  password: string,
}


export default function Login({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({ 
    email: '', 
    password: ''
  });
  const labelStyle="block text-green-700 font-bold mb-1"
  const InputStyle="w-full px-4 py-2 border border-green-300 bg-green-50 text-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value}));
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('')
    try {
      const res = await axiosInstance.post('/auth/login', formData,{
        withCredentials: true,
      });
      
      setMessage(res.data.message || "login successful");
      router.push('/dashboard')
      setTimeout(() => setMessage(''), 3000);
     
      }catch(err:any){
        if(axios.isAxiosError(err)) {
          if (err.response?.status === 403) {
            setError("Your account is not verified. Redirecting to verification...");
            setTimeout(() => {
              router.push("/auth/verification");
            }, 1500);
          } else if (err.response?.status === 400) {
            setError("Invalid credentials. Please check your email or password.");
          } else {
            setError("Something went wrong during login, check credentials. Please try again.");
          }
        } else {
          setError("Unexpected error occurred. Try again later.");
        }
        setTimeout(() => setError(''), 5000);
      }finally{
        setLoading(false);
      }
   }
   
   return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
          <div className="text-center">
            <div className="flex justify-centre">
              <Image src="/logo.png" alt="Logo" width={80} height={40} className="mx-auto mb-2 rounded-full" />
            </div>
            <h2 className="text-2xl font-bold text-green-800">Sign in to your account</h2>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="">
              <div>
                <label htmlFor="email" className={labelStyle}>
                  Email:
                </label>
                <input
                  id="username"
                  name="email"
                  type="text"
                  placeholder="Email"
                  className={InputStyle}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
  
              <div>
                <label htmlFor="password" className={labelStyle}>
                  Password:
                </label>
                <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className={InputStyle}
                  placeholder="......"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  onClick={()=> setShowPassword(!showPassword)}
                  className="absolute top-2 right-3 cursor-pointer text-green-600"
                >
                  {showPassword ? <EyeOff/> : <Eye/>}
                </span>
                </div>
              </div>
            </div>
  
            <div className="flex items-center justify-between text-sm">
              <div className="">
              <label htmlFor="remember-me" className="flex items-center text-green-700">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="mr-2 rounded border-green-300 text-green-600 focus:ring-green-500"
                />
                  Remember me
                </label>
              </div>
  
              <div className="text-sm">
                <Link href="/auth/reset-password" className="text-green-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>
              
            </div>
  
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
          </form>
          {error && (
            <p style={{ color: 'red'}}>{error}</p>
           
          )}
          {message && (
            <p style={{ color: 'green'}}>{message}</p>
          )}
          <Link href="/" className="text-green-600 hover:underline pr-5"> ← Back to Home</Link>
          <Link href="/auth/register" className="text-green-600 hover:underline pl-3 mr-10">Or Register </Link>
        </div>
      </div>
    );
}