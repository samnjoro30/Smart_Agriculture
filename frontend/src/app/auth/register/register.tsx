"use client"

import React, { useState } from 'react';
import axiosInstance from '../../API/axiosInstance';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff} from 'lucide-react'

type FormData = {
    username: string;
    email: string;
    farmname: string;
    phonenumber: string;
    password: string;
    confirmpassword: string;
}

const Register = () => {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>('');
    const [toogle, setToogle] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState<{ strength: string, color: string }>({ strength: '', color: '' });
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        farmname: '',
        phonenumber: '',
        password:'',
        confirmpassword: '',
    })
    const router = useRouter();
    const inputClass = "w-full px-4 py-2 border border-green-300 bg-green-50 text-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";


    const getPasswordStrength = (password: string): { strength: string, color: string } => {
        let strength = 0;
    
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
    
        if (strength <= 2) return { strength: "Weak", color: "red" };
        else if (strength === 3 || strength === 4) return { strength: "Medium", color: "orange" };
        else return { strength: "Strong", color: "green" };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{

        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
        if (name === "password") {
            const strengthCheck = getPasswordStrength(value);
            setPasswordStrength(strengthCheck);
        }
        
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        setError('');
        setMessage('')
        try{

            const response = await axiosInstance.post('/auth/register',
            {
                username: formData.username,
                email: formData.email,
                farmname: formData.farmname,
                phonenumber: formData.phonenumber,
                password: formData.password,
                // confirmpassword: formData.confirmpassword
            }
            )
            console.log("data", response)
            if (response.data.success){
                setMessage(response.data.message || 'Registered successfully!');
                setTimeout(() => {
                    router.push('/verification');
                }, 1000)
            }else{
                setError(response.data.message || "Registration failed")
            }
        }catch(err: any){
            console.error("Error registering from backend", err);
            setError("Error registering. Try again");
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-6 ">
                <h2 className="text-3xl font-extrabold text-center text-green-800">Register Panel</h2>
            <p className="text-center text-green-700">To enjoy seamless Agriculture insight, register below</p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <label className="block text-green-700 mb-1">Username:</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="samdoe"
                          required
                          className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-green-700 mb-1">Farm Name:</label>
                        <input
                          type="text"
                          name="farmname"
                          value={formData.farmname}
                          onChange={handleChange}
                          placeholder="smartfarm"
                          required
                          className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-green-700 mb-1">Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="sam@gmail.com"
                          required
                          className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-green-700 mb-1">Phone Number:</label>
                        <input
                          type="text"
                          name="phonenumber"
                          value={formData.phonenumber}
                          onChange={handleChange}
                          placeholder="07xxxxxx"
                          required
                          className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="block text-green-700 mb-1">Password:</label>
                        <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              className={inputClass}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-2 right-3 cursor-pointer text-green-600"
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </span>
                        </div>
                        {formData.password && (
                            <p className="mt-1 text-sm" style={{ color: passwordStrength.color }}>
                                Password strength: {passwordStrength.strength}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-green-700 mb-1">Confirm Password:</label>
                        <input
                          type="password"
                          name="confirmpassword"
                          value={formData.confirmpassword}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                {message && <p className="text-center text-green-700 font-medium">{message}</p>}
                {error && <p className="text-center text-red-600 font-medium">{error}</p>}
            </div>
        </div>
    )
}
export default Register;