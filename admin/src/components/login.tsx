"use client";


import React, { useState } from "react";

interface adminLoginProps {
    userId: string;
    password: string;
}


export default function Login() {

    const [userId, setUserId] = useState<string>("");
    const [adminData, setAdminData] = useState<adminLoginProps>({
        userId: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdminData(prev => ({ ...prev, [name]: value}));
    }
    return(
        <div className="">
            <h1>Smart Farm</h1>
            <div>
                <label htmlFor="userId">ADMIN ID:</label>
                <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">PASSWORD:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handleChange}
                    required
                />
            </div>
        </div>
    )
}