"use client"

import {useState, useEffect } from 'react';
import axiosInstance from '../API/axiosInstance';

interface User {
    farmname: string,
    username: string,
    email: string,
    Phonenumber: string
}

export default function Overview(){
    const [user, setUser] = useState<User | null>(null);

    useEffect(() =>{
        const fetchUserDetails = async () =>{

            try{
                const res = await axiosInstance.get("/users/userprofile")
                setUser(res.data.message);

            }catch(err){
                const error = err instanceof Error ? err : new Error(String(err));
                console.error("Error occurred fetching details", error)
            }
        }
        fetchUserDetails();
    }, []);
    return(
        <div>
            <div>
                {user ? (
                    <ul>
                        <li><strong>Name:</strong> {user.username}</li>
                        <li><strong>Email:</strong> {user.email}</li>
                    </ul>

                ) : (
                    <p></p>
                )}

            </div>
            <div>
                {user ? (
                    <ul>
                        <li><strong>Farm:</strong> {user.farmname}</li>
                        <li><strong>Phone:</strong> {user.Phonenumber}</li>
                    </ul>

                ): (
                    <p></p>
                )}
            </div>
            <div>
                <div>
                    <h3>Updates</h3>

                </div>
                <div>
                    <h3>Insights</h3>

                </div>
            </div>
        </div>

    )
}