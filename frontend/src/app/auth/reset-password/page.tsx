"use client"

import { useState } from 'react';
import axiosInstance from "../../API/axiosInstance";
import { useRouter } from 'next/navigation';

interface FormData {
    email: string,
    newPassword: string,
    confirmPassword: string
}

export default function ResetPassword (){
    const [ loading, setLoading] = useState<boolean>(false);
    const [ error, setError]  = useState<string>('')
    const [ formData, setFormData] = useState <FormData> ({
        email: '',
        newPassword: '',
        confirmPassword: ''
    })
    const navigate = useRouter();

    const labelStyle = "block text-green-700 font-bold mb-1";
    const inputStyling = "w-full px-4 py-2 border border-green-300 bg-green-50 text-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setFormData(prev =>({ ...prev, [name] : value}))
    }

    const handleSubmit = async (e: { preventDefault: () => void;}) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        try{
            "use server"
            const res = await axiosInstance.post("/auth/reset-password", formData);
            setFormData(res.data.message);
            setTimeout(() =>{
                navigate.push("/login")
            }, 1000)
        }catch(err){
            const error = err instanceof Error ? err : new Error(String(err));
            console.error("Error occurred during resetting, please try again: ", error)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
                <h1 className="text-2xl font-bold text-green-800 text-center">Reset Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4" >
                    <div>
                        <label className={labelStyle}>Email:</label>
                        <input
                          type=""
                          onChange={handleChange}
                          className={inputStyling}
                          required
                        />
                    </div>
                    <div>
                        <label className={labelStyle}>New Password:</label>
                        <input
                          type=""
                          onChange={handleChange}
                          className={inputStyling}
                          required
                        />
                    </div>
                    <div>
                        <label className={labelStyle}>Confirm New Password:</label>
                        <input
                          type=""
                          onChange={handleChange}
                          className={inputStyling}
                          required
                        />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                       {loading ? 'Reseting ..' : 'Reset Password' }
                    </button>
                </form>
            </div>
        </div>
    )
}