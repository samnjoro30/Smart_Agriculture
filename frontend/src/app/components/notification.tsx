"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../API/axiosInstance";

interface NotificationType {
    _id: string;
    title: string;
    message: string;
    createdAt: string;
}

export default function Notification() {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [weekly, setWeekly] = useState<NotificationType[]>([]);
    const [monthly, setMonthly] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [popup, setPopup] = useState<NotificationType | null>(null);

    
    const categorize = (data: NotificationType[]) => {
        const now = new Date();
        const weekAgo = new Date(now);
        const monthAgo = new Date(now);

        weekAgo.setDate(now.getDate() - 7);
        monthAgo.setDate(now.getDate() - 30);

        setWeekly(data.filter(n => new Date(n.createdAt) >= weekAgo));
        setMonthly(data.filter(n => new Date(n.createdAt) >= monthAgo));
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await axiosInstance.get("/farm/notification");
                const newData: NotificationType[] = res.data.notifications || [];
                
                
                if (newData.length > notifications.length) {
                    const latest = newData[0]; 
                    setPopup(latest);

                    setTimeout(() => setPopup(null), 4000);
                }

                setNotifications(newData);
                categorize(newData);

            } catch (err) {
                setError("Failed to load notifications");
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className=" bg-gray-100 p-1">

            {/* PUSH NOTIFICATION POPUP */}
            {popup && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white shadow-xl border-l-4 border-green-600 rounded-lg p-4 animate-slideDown z-50">
                    <h4 className="font-semibold text-green-700">{popup.title}</h4>
                    <p className="text-gray-700 mt-1">{popup.message}</p>
                </div>
            )}

            {/* Container */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
                    Notifications
                </h2>

               
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    
                    <div className="bg-green-200 shadow-md rounded-xl p-4 border border-green-100">
                        <h3 className="text-green-600 font-bold text-lg mb-3">
                            Weekly
                        </h3>

                        {loading && (
                            <p className="text-gray-500">Loading...</p>
                        )}

                        {weekly.length === 0 && !loading && (
                            <p className="text-gray-500">No weekly notifications.</p>
                        )}

                        <div className="space-y-3">
                            {weekly.map((note) => (
                                <div
                                    key={note._id}
                                    className="p-3 bg-green-50 border-l-4 border-green-600 rounded-lg"
                                >
                                    <h4 className="font-semibold text-green-700">
                                        {note.title}
                                    </h4>
                                    <p className="text-gray-700">{note.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(note.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    
                    <div className="bg-green-200 shadow-md rounded-xl p-4 border border-blue-100">
                        <h3 className="text-green-600 font-bold text-lg mb-3">
                            Monthly
                        </h3>

                        {monthly.length === 0 && !loading && (
                            <p className="text-gray-500">No monthly notifications.</p>
                        )}

                        <div className="space-y-3">
                            {monthly.map((note) => (
                                <div
                                    key={note._id}
                                    className="p-3 bg-blue-50 border-l-4 border-blue-600 rounded-lg"
                                >
                                    <h4 className="font-semibold text-blue-700">
                                        {note.title}
                                    </h4>
                                    <p className="text-gray-700">{note.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(note.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Popup animation */}
            <style>{`
                @keyframes slideDown {
                    0% { opacity: 0; transform: translate(-50%, -20px); }
                    100% { opacity: 1; transform: translate(-50%, 0); }
                }
                .animate-slideDown {
                    animation: slideDown 0.4s ease-out;
                }
            `}</style>
        </div>
    );
}
