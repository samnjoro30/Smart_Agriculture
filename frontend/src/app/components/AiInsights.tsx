"use client";

import {useEffect} from 'react';
import axiosInstance from '../API/axiosInstance';


export default function AiInsights(){

    useEffect(() => {
        const ResponseAiInsight = async () =>{
            try{
               const res = await axiosInstance.get("/farm/ai-insights")

            }catch(err){

            }
        };
        ResponseAiInsight();
    }, []);
    return(
        <div>

        </div>
    );
}