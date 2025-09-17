// "use client";

import axiosInstance from "../API/axiosInstance";
import { useState } from 'react';


export default function ContactCentre(){
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const handleSubmit = async () => {
        setLoading(true);
        setMessage('');
        try{
            const res = await axiosInstance.post("/user/contact");

            const Data = res.data.message;
            setMessage(Data || "Message delivered Seccessfully" )

        }catch(err){
            console.error("error sending the message")

        }finally{
            setLoading(false)

        }
    }
    return(
        <div className="grid grid-cols-1 md:grid-cols gap-6 rounded-lg p3 bg-gray-50 h-auto">
            <div className="space-y-6">
                <div className="bg-green-100 rounded-xl px-2  py-3">
                    <h3>Get Intouch with us:</h3>
                    <p>Contact: +254 799 169 720</p>
                    <p>Email: samnjorokibandi@gmail.com</p>
                </div>
            </div>
            <div className="space-y-6">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email: </label>
                        <input
                          type="email"
                          value=""
                          className=""
                        />
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input
                          type="email"
                          value=""
                          className=""
                        />
                    </div>
                    <div>
                        <label>Issue</label>
                        <input
                          type="email"
                          value=""
                          className=""
                        />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className=""
                    >
                        send message
                    </button>
                </form>
                {message && ( <p style={{color: 'red'}}>{message}</p>)}
            </div>
        </div>        
    )
}