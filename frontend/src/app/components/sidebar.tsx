"use client"
import { useState } from "react";
import { LayoutDashboard, Bell, Package, Brain, BarChart3, AlertCircle, User, Headphones } from "lucide-react";
import Overview from "./overview";

export default function Sidebar() {
  const [active, setActive] = useState('Overview')

  const render = () => {
    switch (active){
      case 'overview':
        return <Overview />
      case 'notifications':
        return 'Comming soon'
      default:
        return "choose options in the side bar"
    }

  }

  return (
      // <div className="fixed md:static top-0 left-0 h-screen md:h-auto w-70 bg-green-100 shadow-md p-4 space-y-6 mx-5 transform transition-transform duration-300 ">
      <div className="flex min-h-full">
        <div className="sticky top-0 left-1 md:h-full overflow-y-auto shrink-0 w-16 md:w-64 bg-green-200 shadow-md p-2 md:p-4 space-y-6 transition-all duration-300 ">
        {/* <div> */}
          <h2 className="text-green-700 font-semibold mb-2 border-b border-green-300">Dashboard</h2>
          <div className="flex flex-col space-y-2">
            <button 
              onClick ={() => setActive("overview") }
              className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-300 ${
                active === "overview" ? "bg-green-300 text-green-800 font-semibold" : "text-green-600"
              }`}
            >
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Overview</span>
            </button>

            <button 
               onClick={() => setActive('notifications')}
              className="flex items-center gap-2 text-left px-3 py-2 text-green-600 rounded-md hover:bg-green-300"
            >
              <Bell size={18}/>
              <span className="hidden md:inline">Notifications</span>
            </button>

          </div>

        <div>
          <h2 className="text-green-700 font-semibold mb-2 border-b border-green-300">Product</h2>
          <div className="flex flex-col space-y-2">
            <button className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300"><Package /><span className="hidden md:inline">Farm Inputs</span></button>
            <button className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300">< Brain/> <span className="hidden md:inline">AI Insights</span></button>
            <button className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300">< BarChart3/> <span className="hidden md:inline">Farm Analytics</span></button>
            <button className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300">< AlertCircle /> <span className="hidden md:inline">Alerts</span></button>
            <button className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300">< User/> <span className="hidden md:inline">Farmer Profile</span></button>
          </div>
        </div>
        <div className="mt-35 border-t border-green-300">
          <button className="flex items-center gap-2 text-green-400  px-3 py-2  rounded-md hover:bg-green-300 transition">< Headphones/><span className="hidden md:inline">Contact Support</span></button>
        </div>
      </div>

      <div className="flex-1 p-5 md:h-auto ml-2 bg-green-300">{render()}</div>
    </div> 
  );
}
