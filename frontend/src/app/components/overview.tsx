"use client"

import { useState, useEffect } from 'react';
import axiosInstance from '../API/axiosInstance';

interface User {
    farmname: string,
    username: string,
    email: string,
    phonenumber: string
}

interface FarmStats {
    totalAnimals: number
    pregnant: number
    treatment: number
    feedStatus: string
}

interface Activity {
    id: number
    message: string
    time: string
}

export default function Overview(){

    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<FarmStats | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);

    // useEffect(() => {

    //     const fetchData = async () => {

    //         try{
    //             const [userRes, statsRes, activityRes] = await Promise.all([
    //                 axiosInstance.get("/farm/farm-profile", {withCredentials: true}),
    //                 axiosInstance.get("/farm/stats"),
    //                 axiosInstance.get("/farm/recent-activity")
    //             ])

    //             setUser(userRes.data)
    //             setStats(statsRes.data)
    //             setActivities(activityRes.data)

    //         }catch(err){
    //             console.error("Dashboard fetch error", err)
    //         }

    //     }

    //     fetchData()

    // }, [])

    const fetchUser = async () => {
        try {
            const res = await axiosInstance.get("/farm/farm-profile", { withCredentials: true })
            setUser(res.data)
        } catch (err) {
            console.error("Failed to load user", err)
        }
    }
    useEffect(() => {
        fetchUser()
        // fetchStats()
        // fetchActivity()
      }, [])

    return(
        <div className="bg-white p-4 rounded-xl space-y-6">

            {/* Welcome Banner */}
            <div className="bg-green-100 py-6 px-6 rounded-2xl shadow-md">
                <h2 className="text-gray-900 font-extrabold text-3xl mb-2">
                    Welcome back {user?.username}! 🌱
                </h2>

                <p className="text-green-800 text-lg">
                    Monitor livestock reproduction, health, and productivity at {user?.farmname}.
                </p>
            </div>


            {/* Farm Snapshot */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-green-100 p-4 rounded-xl text-center">
                   <p className="text-2xl text-green-600 font-bold">
                       {stats?.totalAnimals ?? "--"}
                   </p>
                   <p className="text-gray-600 text-sm">Total Animals</p>
                </div>

                <div className="bg-green-100 p-4 rounded-xl text-center">
                    <p className="text-2xl text-green-600 font-bold">
                        {stats?.pregnant ?? "--"}
                    </p>
                    <p className="text-gray-600 text-sm">Pregnant Cows</p>
                </div>

                <div className="bg-green-100 p-4 rounded-xl text-center">
                    <p className="text-2xl text-green-600 font-bold">
                        {stats?.treatment ?? "--"}
                    </p>
                    <p className="text-gray-600 text-sm">Under Treatment</p>
                </div>

                <div className="bg-green-100 p-4 rounded-xl text-center">
                    <p className="text-2xl text-green-600 font-bold">
                        {stats?.feedStatus ?? "--"}
                    </p>
                    <p className="text-gray-600 text-sm">Feed Stock</p>
                </div>

            </div>


            {/* Farmer Information */}
            <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-green-100 p-5 rounded-xl shadow-sm">
                    <h3 className="text-green-700 font-semibold mb-3">Farmer Information</h3>

                    {user ? (
                        <ul className="space-y-2">
                            <li className="text-gray-700"><strong>Name:</strong> {user.username}</li>
                            <li className="text-gray-700"><strong>Email:</strong> {user.email}</li>
                        </ul>
                    ) : (
                       <p className="text-gray-500">Loading farmer details...</p>
                    )}

                </div>


                <div className="bg-green-100 p-5 rounded-xl shadow-sm">
                    <h3 className="text-green-700 font-semibold mb-3">Farm Information</h3>

                    {user ? (
                        <ul className="space-y-2">
                            <li className="text-gray-700"><strong>Farm:</strong> {user.farmname}</li>
                            <li className="text-gray-700"><strong>Phone:</strong> {user.phonenumber}</li>
                        </ul>
                    ) : (
                       <p className="text-gray-500">Loading farm details...</p>
                    )}

                </div>

            </div>


            {/* Updates + Insights */}
            <div className="grid md:grid-cols-2 gap-4">

                <div className="bg-green-50 p-5 rounded-xl shadow-sm">

                    <h3 className="text-green-700 font-semibold mb-3">
                        Latest Livestock Updates
                    </h3>

                    <ul className="space-y-3 text-gray-700 text-sm">

                        <li>🐄 Early heat detection improves conception success.</li>
                        <li>🥛 Balanced dairy feed increases milk yield and fertility.</li>
                        <li>💉 Regular vaccination protects livestock from disease outbreaks.</li>

                    </ul>

                </div>


                <div className="bg-green-100 p-5 rounded-xl shadow-sm">

                    <h3 className="text-green-700 font-semibold mb-3">
                        Smart Farm Insights
                    </h3>

                    <ul className="space-y-3 text-gray-700 text-sm">

                        <li>📊 Tracking reproduction cycles helps improve herd fertility.</li>
                        <li>🌾 Monitoring feed consumption reduces waste and cost.</li>
                        <li>💰 Recording expenses and milk sales helps track profitability.</li>

                    </ul>

                </div>

            </div>


            {/* Recent Activity Feed */}
            <div className="bg-green-50 p-5 rounded-xl shadow-sm">

                <h3 className="text-green-700 font-semibold mb-4">
                    Recent Farm Activity
                </h3>

                <ul className="space-y-3 text-sm text-gray-700">

                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <li key={activity.id} className="flex justify-between border-b pb-2">
                                <span>{activity.message}</span>
                                <span className="text-gray-400 text-xs">{activity.time}</span>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No recent activity recorded.</p>
                    )}

                </ul>

            </div>

        </div>
    )
}