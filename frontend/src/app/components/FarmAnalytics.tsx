

import { useEffect, useState } from 'react';
import axiosInstance from '../API/axiosInstance';

interface Data {
    date: string;
    produce: string;
    ExpectedMate: string;
}

export default function FarmAnalytic(){
    const [analyticData, setAnalyticData] = useState<Data | null>(null)

    useEffect(() => {
        const farmVisualization = async () =>{
            try{
                const res = await axiosInstance.get("/farm/visualization", {
                    withCredentials: true,
                });
                const Data = res.data.message;
                setAnalyticData(Data)
            }catch(err){
                console.log("Error fetching data from backend")
            }
        };
        farmVisualization();
    }, []);

    return(
        <div>

        </div>
    )

}