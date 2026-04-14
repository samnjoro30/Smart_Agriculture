import { useEffect, useState } from "react";
import { Bell, User, ChevronDown, Search } from "lucide-react";
import logo from "../assets/logo.png";
import axiosInstance from "../api/axiosInstance";

interface AdminProfile {
  name?: string;
  role?: "Super Admin" | "Admin" | "HR" | "Partner";
}

export default function Header() {
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
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      
      {/* 🔹 Left */}
      <div className="flex items-center gap-4">
        <img src={logo} alt="logo" className="h-8 w-auto" />
        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
          Smart Farm
        </h1>
      </div>

      {/* 🔹 Center Search */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80 focus-within:ring-2 focus-within:ring-green-500 transition">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm ml-2 w-full text-gray-700"
        />
      </div>

      {/* 🔹 Right */}
      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={20} className="text-gray-600" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] h-5 w-5 flex items-center justify-center rounded-full">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          
          {/* Avatar */}
          <div className="h-9 w-9 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-semibold">
            {admin?.name?.charAt(0) || "A"}
          </div>

          {/* Name */}
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium text-gray-800">
              {admin?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500">
              {admin?.role || "Administrator"}
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-gray-400 group-hover:text-gray-600"
          />
        </div>

      </div>
    </header>
  );
}