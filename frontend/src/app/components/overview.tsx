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
                const error = err instanceof Error ? err : new Error(String(err));
                console.error("Error occurred fetching details", error)
            }
        }
        fetchUserDetails();
    }, []);
    return(
        <div className="bg-white py-1 px-1 pb-1 rounded-xl">
            <div className="bg-green-100 py-6 px-6 rounded-2xl mb-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <h2 className="text-green-900 font-extrabold text-3xl mb-2 text-center"> Welcome back {user?.username}! 🌱</h2>
                <p className="text-green-800 text-center italic text-lg">Together we grow stronger. Explore the latest tools, tips, and opportunities for farmers like you.</p>
            </div>
            <div  className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="bg-green-100 py-6 px-4 rounded-xl flex-1">
                {user ? (
                    <ul className="border-t border-green-500">
                        <li className="text-black"><strong>Name:</strong> {user.username}</li>
                        <li className="text-black"><strong>Email:</strong> {user.email}</li>
                    </ul>

                ) : (
                   
                    <p className="animate-spin rounded-full h-10 w-9 border-green-200"></p>
                )}

            </div>
            <div className="bg-green-100 py-6 px-4 rounded-xl flex-1">
                {user ? (
                    <ul className="border-t border-green-500 py-5 px-4">
                        <li className="text-black"><strong>Farm:</strong> {user.farmname}</li>
                        <li className="text-black"><strong>Phone:</strong> {user.phonenumber}</li>
                    </ul>

                ): (
                    <p></p>
                )}
            </div>
            </div>
            <div className="flex flex-col py-4 bg-white-300 rounded-full">
                <div className="bg-green-100 rounded-xl py-5 px-4 flex-1">
                    <h3 className="text-green-600 font-bold text-center">Updates</h3>
                    <p className="text-gray-800 italic mb-4">find latest trends in farming</p>
                    <p className="text-gray-800 italic mb-4">Emerging trends and topic in terms of agriculture</p>

                </div>
                {/* <div className="mt-2 py-3 px-4 rounded-xl bg-green-100 flex-1">
                    <h3 className="text-green-500 font-bold text-center">Insights</h3>
                    <p className="text-gray-800 italic mb-4">High productivity of cows</p>
                    <p className="text-gray-800 italic mb-4">Explore diaspore market for my Agriculture products</p>
                    <p className="text-gray-800 italic mb-4">how much is to make profit from my Agricultural products</p>
                </div> */}
            </div>
        </div>

    )
}