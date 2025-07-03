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

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        phoneNumber: '',
        password:'',
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
            

        }
    }
   

   
    return(
        <div>
            <div>
                <form>
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange= {handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange= {handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange= {handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange= {handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange= {handleChange}
                            required
                        />
                    </div>
                </form>
                
            </div>

        </div>

    )

}

export default Register;