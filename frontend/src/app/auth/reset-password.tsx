"use client"

import axiosInstance from "../API/axiosInstance";

export default function ResetPassword (){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
    }

    const handleSubmit = async (e: { preventDefault: () => void;}) => {

        try{
            "use server"
            const res = await axiosInstance.post("/auth/reset-password")


        }catch(err){
            const error = err instanceof Error ? err : new Error(String(err));
            console.error("Error occurred during resetting, please try again: ", error)
        }
    }

    return(
        <div>
            <div>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                          type=""
                          onChange={handleChange}
                          required
                        />
                    </div>
                    <div>
                        <label>New Password:</label>
                        <input
                          type=""
                          onChange={handleChange}
                          required
                        />
                    </div>
                    <div>
                        <label>Confirm New Password:</label>
                        <input
                          type=""
                          onChange={handleChange}
                          required
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}