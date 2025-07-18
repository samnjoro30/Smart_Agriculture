"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../API/axiosInstance";

type FormData = {
    email: string;
    otp: string;
}

const Verification = () => {
    const router = useRouter();
    const [error, setError ] = useState<string>('')
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
        setError('')

        try{
            const res = await axiosInstance.post('/api/verification', formData);
            if ( res.data.success){
                router.push('/dashboard');
            }
        }catch(err){
            console.error("Error occurred during verification", err);
            setError("Error Occured during verification, try checking verification code ");
        }finally {

        }
    }
    return(
        <div className="">
            <div className="">
                <form onSubmit={handleVerification} className="">
                    <div className="">
                        <label>Email:</label>
                        <input 
                           type='text'
                           name="email"
                           value={formData.email}
                           onChange ={ handleChange}
                           required
                        />
                    </div>
                    <div className="">
                        <input 
                           type='text'
                           name='otp'
                           value={ formData.otp}
                           onChange= {handleChange}
                           required
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Verification;