
import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';

interface adminLoginProps {
    userId: string;
    password: string;
}


const  Login = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [adminData, setAdminData] = useState<adminLoginProps>({
        userId: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdminData(prev => ({ ...prev, [name]: value}));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);
        try {
            const  response = await axiosInstance.post("/auth/login", {
                userId: adminData.userId,
                password: adminData.password,
            })
            setMessage(response.data.message || "Login successful");
            navigate('/dashboard');
            setTimeout(() => setMessage(""), 3000);
        }catch(err){
            const  error = err instanceof Error ? err.message : "Something went wrong during login. Please try again.";
            setError(error);
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="bg-green-50 w-full max-w-md shadow-lg rounded-xl p-8 space-y-6">
            <div className="flex justify-centre">
            <h1 className="font-bold">Smart Farm</h1>
            <img src={logo} alt="Smart Farm Logo" width={80} height={40} className="mx-auto mb-2 rounded-full" />
            </div>
            <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-green-700 font-bold mb-1" htmlFor="userId">ADMIN ID:</label>
                    <input
                       type="text"
                       id="userId"
                       name="userId"
                       value={adminData.userId}
                       onChange={handleChange}
                       className="w-full px-4 py-2 border border-green-300 bg-green-50 text-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                       required
                    />
                </div>
                <div>
                    <label className="block text-green-700 font-bold mb-1" htmlFor="password">PASSWORD:</label>
                    <input
                       type="password"
                       id="password"
                       name="password"
                       value={adminData.password}
                       onChange={handleChange}
                       className="w-full px-4 py-2 border border-green-300 bg-green-50 text-green-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                       required
                    />
                </div>
                <button 
                   type="submit"
                   disabled={loading} 
                   className="w-full flex justify-center items-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
                >
                    LOGIN
                </button>
            </form>
        </div>
    )
}
export default Login;