import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';

interface AdminLoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminLoginProps>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: adminData.email,
        password: adminData.password,
      });

      setMessage(response.data.message || "Login successful");
      navigate('/dashboard');
    } catch (err) {
      const error =
        err instanceof Error
          ? err.message
          : "Something went wrong during login.";
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="Smart Farm Logo"
            className="w-16 h-16 rounded-full border shadow-sm mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Smart Farm Admin
          </h1>
          <p className="text-gray-500 text-sm">
            Secure access panel
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-green-500 
              focus:border-transparent transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-green-500 
              focus:border-transparent transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Feedback */}
          {message && (
            <p className="text-green-600 text-center text-sm">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-center text-sm">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;