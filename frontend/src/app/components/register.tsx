"use client"

import React, { useState } from 'react';
import axiosInstance from '../API/axiosInstance';
import { useRouter } from 'next/navigation';

type FormData = {
    username: string;
    email: string;
    farmName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [toogle, setToogle] = useState<boolean>(false)
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        farmName: '',
        phoneNumber: '',
        password:'',
        confirmPassword: '',
    })
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));

    }

    const handleSubmit = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        setLoading(true);
        setError('');
        try{

            const response = await axiosInstance.post('/api/register',
                formData
            )
            if (response.data.success){
                router.push('/verification');
            }
            
        }catch(err: unknown){
            console.error("Error registering from backend", err);
            setError("Error registering. Try again");
        }finally{

        }
    }

    const toogleVisibility = () => {


    }
    const passwordConfirmation = () => {

    }
    return(
        <div className="">
            <div className="">
                <h2> Register Panel</h2>
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
                            name="farmName"
                            value={formData.farmName}
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
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange= {handleChange}
                            placeholder="07xxxxxx"
                            required
                        />
                    </div>
                    <div className="">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange= {handleChange}
                            required
                        />
                    </div>
                    <div className="">
                        <label> Confirm Password:</label>
                        <input
                           type="password"
                           name="confirmPassword"
                           value={ formData.confirmPassword}
                           onChange={ handleChange}
                           required
                        />
                    </div>
                </form>
            </div>
        </div>

    )

}

export default Register;