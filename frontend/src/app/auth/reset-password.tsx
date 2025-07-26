"use client"

import { useState } from 'react';
import axiosInstance from "../API/axiosInstance";
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
        <div>
            <div>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                          type=""
                          onChange={handleChange}
                          required
                        />
                    </div>
                    <div>
                        <label>New Password:</label>
                        <input
                          type=""
                          onChange={handleChange}
                          required
                        />
                    </div>
                    <div>
                        <label>Confirm New Password:</label>
                        <input
                          type=""
                          onChange={handleChange}
                          required
                        />
                    </div>
                    <button>
                       {loading ? 'Reseting ..' : 'Reset Password' }
                    </button>
                </form>
            </div>
        </div>
    )
}