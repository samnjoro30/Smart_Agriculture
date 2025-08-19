"use client"
import { useState } from "react";
import Wrapper from "./wrapper";

export default function Sidebar() {
    const [activeSection, setActiveSection] = useState('overview')

  return (
      <div className="fixed md:static top-0 left-0 h-screen md:h-auto w-70 bg-green-100 shadow-md p-4 space-y-6 mx-5 transform transition-transform duration-300 ">
        <div>
          <h2 className="text-green-700 font-semibold mb-2 border-b border-green-300">Dashboard</h2>
          <div className="flex flex-col space-y-2">
            <button onClick={()=> setActiveSection('overview')} className="text-left px-3 py-2 text-green-400 rounded-md hover:bg-green-200">Overview</button>
            <button className="text-left px-3 py-2 text-green-400 rounded-md hover:bg-green-200">Notifications</button>
          </div>
        </div>

        <div>
          <h2 className="text-green-700 font-semibold mb-2 border-b border-green-300">Product</h2>
          <div className="flex flex-col space-y-2">
            <button className="text-left px-3 py-2 text-green-400 rounded-md hover:bg-green-200">Farm Inputs</button>
            <button className="text-left px-3 py-2 text-green-400 rounded-md hover:bg-green-200">AI Insights</button>
            <button className="text-left px-3 py-2 text-green-400 rounded-md hover:bg-green-200">Farm Analytics</button>
            <button className="text-left px-3 py-2 text-green-400 rounded-md hover:bg-green-200">Alerts</button>
            <button className="text-left px-3 py-2 text-green-400 rounded-md hover:bg-green-200">Farmer Profile</button>
          </div>
        </div>
        <div className="mt-35 border-t border-green-300">
            <button className="text-green-400  px-3 py-2  rounded-md hover:bg-green-300 transition">Contact Support</button>
        </div>
        
      </div>
  );
}
