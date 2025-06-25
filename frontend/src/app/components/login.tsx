"use client"
import React, { useState } from 'react';
import axiosInstance from '../API/axiosInstance';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
import { parseSetCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export default function Login() {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const Router = useRouter();

   const [formData, setFormData] = useState({ username: '', password: '' });

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      try {
         const res = await axiosInstance.post('/login',{
            formData
         });
         Cookies.set('token', res.data.token);
         Router.push('/dashboard')
      }catch(err){
          console.error("Error trying to login", err);
      }
   }
   
   return(
    <div>
       <h1>login form</h1>
       <form>
          <div>
            <label>Username:</label>
            <input 
               id="username"
               name="name" 
               type="text" 
               placeholder="sam njoro" 
               required>
              
            </input>
          </div>
          <div>
            <label>password:</label>
            <input 
               id="password"
               name="password"  
               type="password" 
               required 
               />
          </div>
       </form>
    </div>
   )
}