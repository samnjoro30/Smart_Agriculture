
import {useEffect} from 'react';
import axiosInstance from '../API/axiosInstance';


export default function Notification() {
    useEffect(() => {
        const weekUpdate =  async () =>{
            try{
                const res = await axiosInstance.get('/users/notification')

            }catch(err){

            }
        }
        weekUpdate();
    }, []);
    return(
        <div className="bg-gray-100">
            <div className="bg-green-100 rounded-xl ">
                <h3 className="text-green-500 font-bold text-center">Check out This week</h3>
            </div>
        </div>
    )
}