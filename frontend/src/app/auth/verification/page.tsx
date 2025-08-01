"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../API/axiosInstance";

type FormData = {
    email: string;
    otp: string;
}

const Verification = () => {
    const router = useRouter();
    const [error, setError ] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData ] = useState<FormData>({
        email: '',
        otp: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}))
    }

    const handleVerification = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try{
            "use server"
            const res = await axiosInstance.post('/api/verification', formData);
            if ( res.data.success){
                setMessage('Verification successfull. Redirecting...')
                setTimeout(() => {
                    setMessage('')
                    router.push('/login')
                })
            }
        }catch(err: unknown){
            console.error("Error occurred during verification", err);
            setError("Error Occured during verification, try checking verification code ");
            setTimeout(() => setError(''), 1000);
        }finally {
            setLoading(false)
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold text-green-800 text-center">Email Verification</h2>
                <p className="text-sm text-green-700 text-center">Enter the verification code sent to your email.</p>

                <form onSubmit={handleVerification} className="space-y-4">
                    <div>
                        <label className="block text-green-700 mb-1">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-green-300 bg-green-50 text-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-green-700 mb-1">Verification Code (OTP):</label>
                        <input
                            type="text"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-green-300 bg-green-50 text-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="123456"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>

                {message && <p className="text-center text-green-700 font-medium">{message}</p>}
                {error && <p className="text-center text-red-600 font-medium">{error}</p>}
            </div>
        </div>
    );
};

export default Verification;