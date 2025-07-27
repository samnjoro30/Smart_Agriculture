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
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        farmname: '',
        phonenumber: '',
        password:'',
        confirmpassword: '',
    })
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
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

    const passwordConfirmation = () => {

    }
    return(
        <div className="">
            <div className="">
                <h2 className='ext-2xl font-bold mb-6 text-center'> Register Panel</h2>
                <p>To enjoy seamless Agriculture insight register</p>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange= {handleChange}
                            placeholder='samdoe'
                            required
                        />
                    </div>
                    <div className="">
                        <label>Farm Name:</label>
                        <input
                            type="text"
                            name="farmname"
                            value={formData.farmname}
                            onChange={ handleChange}
                            placeholder="smartfarm"
                            required
                        />
                    </div>
                    <div className="">
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange= {handleChange}
                            placeholder='sam@gmail.com'
                            required
                        />
                    </div>
                    <div className="">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phonenumber"
                            value={formData.phonenumber}
                            onChange= {handleChange}
                            placeholder="07xxxxxx"
                            required
                        />
                    </div>
                    <div className="">
                        <label>Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange= {handleChange}
                            required
                        />
                        <span
                          onClick={ ()=> setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff /> : <Eye/>} 
                        </span>
                    </div>
                    <div className="">
                        <label> Confirm Password:</label>
                        <input
                           type="password"
                           name="confirmpassword"
                           value={ formData.confirmpassword}
                           onChange={ handleChange}
                           required
                        />
                    </div>
                    <button 
                       type="submit"
                       disabled={loading}
                       className="btn btn-primary w-80"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {message && <p style={{ color: "green"}}> {message} </p>}
                {error && <p style={{ color: "red"}}>{error}</p>}
            </div>
        </div>
    )
}
export default Register;