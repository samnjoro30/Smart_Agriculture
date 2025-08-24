"use client"

import {useState, useEffect } from 'react';
import axiosInstance from '../API/axiosInstance';

interface User {
    farmname: string,
    username: string,
    email: string,
    phonenumber: string
}

export default function Overview(){
    const [user, setUser] = useState<User | null>(null);

    useEffect(() =>{
        const fetchUserDetails = async () =>{

            try{
                const res = await axiosInstance.get("/users/userprofile", {
                    withCredentials: true,
                })
                setUser(res.data.message);

            }catch(err){
                const error
                 = err instanceof Error ? err : new Error(String(err));
                console.error("Error occurred fetching details", error)
            }
        }
        fetchUserDetails();
    }, []);
    return(
        <div className="bg-white py-12 px-4 rounded-xl">

            <div  className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="bg-green-100 py-6 px-4 rounded-xl flex-1">
                <h3 className="text-green-400">welcome</h3>
                {user ? (
                    <ul className="border-t border-green-500">
                        <li className="text-black"><strong>Name:</strong> {user.username}</li>
                        <li className="text-black"><strong>Email:</strong> {user.email}</li>
                    </ul>

                ) : (
                    <p></p>
                )}

            </div>
            <div className="bg-green-100 py-6 px-4 rounded-xl flex-1">
                {user ? (
                    <ul>
                        <li className="text-black"><strong>Farm:</strong> {user.farmname}</li>
                        <li className="text-black"><strong>Phone:</strong> {user.phonenumber}</li>
                    </ul>

                ): (
                    <p></p>
                )}
            </div>
            </div>
            <div className="bg-white rounded-xl">
                <div className="bg-gray-100 py-12 px-4 ">
                    <h3 className="text-green-600">Updates</h3>

                </div>
                <div>
                    <h3>Insights</h3>

                </div>
            </div>
        </div>

    )
}