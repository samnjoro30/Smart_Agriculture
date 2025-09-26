"use client";

import { useEffect, useState} from 'react';
import axiosInstance from '../API/axiosInstance';

export default function Alerts(){
    const[ display, setDisplay] = useState<[]>([])


    useEffect(()=>{
        const AlertDisplay = async () =>{
            try{
                const res = await axiosInstance.get("/farmer/alerts");
                setDisplay(res.data.message);
            }catch(err){

            }

        }
        AlertDisplay();
    }, [])

    return(
        <>
            <h2 className="text-bold text-green-900">In development</h2>
        </>
    )
}