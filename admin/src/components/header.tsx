

import { useEffect, useState } from "react";
import { Bell, User } from "lucide-react";
import logo from '../assets/logo.png';
import axiosInstance from "../api/axiosInstance";

interface AdminProfile {
  name?: string;
  role?: "Super Admin" | "Admin" | "HR" | "Partner";
}

export default function Header(){
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const [profileRes, notificationRes] = await Promise.all([
          axiosInstance.get("/admin/me"),
          axiosInstance.get("/notifications/unread/count"),
        ]);

        setAdmin(profileRes.data);
        setNotificationCount(notificationRes.data.count || 0);
      } catch (error) {
        console.error("Failed to load header data", error);
      }
    };

    fetchHeaderData();
  }, []);

  return (
    <header className="fixed top-1 left-1 right-1 z-50 bg-white border-b border-gray-200 shadow-sm rounded-xl">
      <div className="w-full px-6 py-6 flex items-center justify-between">

        {/* Left: Branding */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Smart Farm Logo"
            className="w-15 h-15 rounded-full border border-green-300 shadow-sm"
          />
          <h1 className="text-lg font-bold text-green-700 tracking-wide">
            Smart Farm Admin
          </h1>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center space-x-5">

          {/* Notification Bell */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <Bell className="text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Admin Profile */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {admin?.name || "Loading..."}
              </p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                {admin?.role || "—"}
              </span>
            </div>

            <div className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full">
              <User className="text-gray-600" size={18} />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
