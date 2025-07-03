import React, { useState } from 'react';
import axiosInstance from '../API/axiosInstance';
import { useRouter } from 'next/navigation';

type FormData = {
    username: string;
    email: string;
    phoneNumber: string;
    password: string

}

const Register = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password:'',
    })
    const router = useRouter();

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


            
        }catch(err){

        }
    }
   

   
    return(
        <div>

        </div>

    )

}

export default Register;