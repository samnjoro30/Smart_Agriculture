
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
        <div className="bg-green-100">
            <h1>Smart Farm</h1>
            <img src={logo} alt="Smart Farm Logo" width={80} height={40} className="mx-auto mb-2 rounded-full" />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">ADMIN ID:</label>
                    <input
                       type="text"
                       id="userId"
                       name="userId"
                       value={adminData.userId}
                       onChange={handleChange}
                       required
                    />
                </div>
                <div>
                    <label htmlFor="password">PASSWORD:</label>
                    <input
                       type="password"
                       id="password"
                       name="password"
                       value={adminData.password}
                       onChange={handleChange}
                       required
                    />
                </div>
                <button 
                   type="submit" 
                   className=""
                >
                    LOGIN
                </button>
            </form>
        </div>
    )
}
export default Login;