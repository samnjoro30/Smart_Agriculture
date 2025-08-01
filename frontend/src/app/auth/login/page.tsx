"use client"

import React, { useState } from 'react';
import axiosInstance from '../../API/axiosInstance';
import {useRouter} from 'next/navigation';

interface FormData {
  email: string,
  password: string,
}


export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('')
  const Router = useRouter();

  const [formData, setFormData] = useState<FormData>({ 
    email: '', 
    password: ''
  });
  
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
      "use server"
      const res = await axiosInstance.post('/login', formData,{
        withCredentials: true,
      });
      setMessage(res.data.message || "login successful");
      setTimeout(() =>{
        setMessage('')
        Router.push('/dashboard')
      }, 1000)
      }catch(err: any){
        console.error("Error trying to login", err);
        setError(err?.response?.data?.message || "Error loging try again")
        setTimeout(() => setError(''), 3000);
      }
   }
   
   return (
      <div className="">
        <div className="">
          <div className="text-center">
            <h2 className="">Sign in to your account</h2>
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div className="">
              <div>
                <label htmlFor="email" className="">
                  email
                </label>
                <input
                  id="username"
                  name="email"
                  type="text"
                  className=""
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
  
              <div>
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className=""
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
  
            <div className="">
              <div className="">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className=""
                />
                <label htmlFor="remember-me" className="">
                  Remember me
                </label>
              </div>
  
              <div className="text-sm">
                <a href="#" className="">
                  Forgot your password?
                </a>
              </div>
              
            </div>
  
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
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
        </div>
      </div>
    );
}