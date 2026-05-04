import { useEffect, useState } from "react";
import { ChevronDown, Search, Bell, LogOut} from "lucide-react";
import logo from "../assets/logo.png";
import axiosInstance from "../api/axiosInstance";

interface AdminProfile {
  full_name: string;
  email: string;
  role?: string;
}

export default function Header() {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    window.location.href = "/";
  }

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await axiosInstance.get("/admin/auth/me");
        setAdmin(response.data);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        // If 401, you might want to redirect to /login
      }
    };
    fetchHeaderData();
  }, []);

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between sticky top-0 z-50">
      
      {/* 🔹 Left: Branding */}
      <div className="flex items-center gap-4">
        <div className="p-1.5 bg-green-50 rounded-lg">
          <img src={logo} alt="logo" className="h-8 w-8 object-contain" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-gray-900 leading-none">Smart Farm</h1>
          <p className="text-[10px] uppercase tracking-wider text-green-600 font-bold">Admin Panel</p>
        </div>
      </div>

      {/* 🔹 Center: Enhanced Search */}
      <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-96 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-500 transition-all duration-200">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search analytics, farmers, or reports..."
          className="bg-transparent outline-none text-sm ml-3 w-full text-gray-700 placeholder:text-gray-400"
        />
        <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-white border rounded">
          ⌘K
        </kbd>
      </div>

      {/* 🔹 Right: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-5">
        
        {/* Notifications */}
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1 pr-2 hover:bg-gray-50 rounded-full transition group"
          >
            {/* Avatar with Status */}
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-green-600 to-green-400 text-white flex items-center justify-center text-sm font-bold shadow-sm border-2 border-white">
                {admin?.full_name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                {admin?.full_name || "Loading..."}
              </p>
              <p className="text-[11px] text-gray-500 font-medium">Administrator</p>
            </div>

            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Actual Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2 animate-in fade-in zoom-in duration-150">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <p className="text-xs text-gray-400">Signed in as</p>
                <p className="text-sm font-medium text-gray-900 truncate">{admin?.email}</p>
              </div>
              
              {/* <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition">
                <User size={16} /> My Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 transition">
                <Settings size={16} /> Settings
              </button> */}
              
              <div className="border-t border-gray-50 mt-1 pt-1">
                <button
                 onClick ={handleLogout}
                 className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}