"use client"
import { useState } from "react";
import { LayoutDashboard, Bell, Package, Brain, BarChart3, AlertCircle, User, Headphones } from "lucide-react";
import dynamic from 'next/dynamic';
import Overview from "./overview";
// import Notification from "./notification";

const Profile = dynamic(() => import('./profile'), {
  loading: () => <p> Loading ...</p>
} )
const NotificationComponent = dynamic(() => import("./notification"), {
  loading: () => <p>loading ...</p>
})

const FarmerInput = dynamic(() => import("./FarmerInput"), {
  loading: () => <p>Loading ...</p>
})

const Contact = dynamic(() => import('./contact'), {
    loading: () => <p>Loading ...</p>
})

const FarmAnalytics = dynamic(() => import('./FarmAnalytics'), {
  loading: () => <p>Loading ...</p>
})

export default function Sidebar() {
  const [active, setActive] = useState('overview')

  const render = () => {
    switch (active){
      case 'overview':
        return <Overview />
      case 'notifications':
        return <NotificationComponent /> 
      case 'packages':
        return 'development in place'
      case 'profile':
        return <Profile />;
      case 'Contact':
        return <Contact />;
      case 'farmer':
        return <FarmerInput />;
      case 'Analytics':
        return <FarmAnalytics />;
      default:
        return "choose options in the side bar";
    }

  }

  return (
      <div className="flex min-h-full">
        <div className="sticky top-0 left-1 md:h-full overflow-y-auto shrink-0 w-16 md:w-64 bg-green-200 shadow-md p-2 md:p-4 space-y-6 transition-all duration-300 ">
        
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

            <button 
              className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300"
              onClick={()=> setActive('farmer')}
            >
              <Package />
              <span className="hidden md:inline">Farm Inputs</span>
            </button>

            <button 
              className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300"
            >
              < Brain/> 
              <span className="hidden md:inline">AI Insights</span>
            </button>

            <button 
              onClick={() => setActive('Analytics')}
              className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300"
            >
              < BarChart3/> 
              <span className="hidden md:inline">Farm Analytics</span>
            </button>

            <button 
              className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300"
            >
              < AlertCircle /> 
              <span className="hidden md:inline">Alerts</span>
            </button>

            <button 
              onClick={() =>setActive('profile')} 
              className="flex items-center gap-2 text-left px-3 py-2 text-green-600 font-bold rounded-md hover:bg-green-300"
            >
              < User/> 
              <span className="hidden md:inline">Farmer Profile</span>
            </button>
            
          </div>
        </div>
        <div className="mt-35 border-t border-green-300">
          <button 
            onClick={() => setActive('Contact')}
            className="flex items-center gap-2 text-green-400  px-3 py-2  rounded-md hover:bg-green-300 transition"
          >
            < Headphones/>
            <span className="hidden md:inline">Contact Support</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-2 md:h-full ml-2 mr-2 bg-green-200">{render()}</div>
    </div> 
  );
}
