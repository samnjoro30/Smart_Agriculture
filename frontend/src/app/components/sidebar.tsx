"use client"

import { useState } from "react";
import {
  LayoutDashboard,
  Bell,
  Package,
  Brain,
  BarChart3,
  AlertCircle,
  User,
  Headphones,
} from "lucide-react";

import dynamic from "next/dynamic";
import Overview from "./overview";

const Profile = dynamic(() => import("./profile"), {
  loading: () => <p>Loading...</p>,
});

const NotificationComponent = dynamic(() => import("./notification"), {
  loading: () => <p>Loading...</p>,
});

const FarmerInput = dynamic(() => import("./FarmerInput"), {
  loading: () => <p>Loading...</p>,
});

const Contact = dynamic(() => import("./contact"), {
  loading: () => <p>Loading...</p>,
});

const FarmAnalytics = dynamic(() => import("./FarmAnalytics"), {
  loading: () => <p>Loading...</p>,
});

const Alerts = dynamic(() => import("./alerts"), {
  loading: () => <p>Loading alerts...</p>,
});

export default function Sidebar() {
  const [active, setActive] = useState("overview");

  const render = () => {
    switch (active) {
      case "overview":
        return <Overview />;

      case "notifications":
        return <NotificationComponent />;

      case "packages":
        return "Development in progress";

      case "profile":
        return <Profile />;

      case "Contact":
        return <Contact />;

      case "farmer":
        return <FarmerInput />;

      case "Analytics":
        return <FarmAnalytics />;

      case "alerts":
        return <Alerts />;

      default:
        return "Choose an option in the sidebar";
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)]">

      {/* Sidebar */}
      <aside className="ml-0.5 w-16 md:w-64 left-1 bg-green-700 shadow-md rounded-lg p-2 md:p-4 mb-1 overflow-y-auto">

        <h2 className="text-gray-200 font-semibold mb-2 border-b border-green-300">
          Dashboard
        </h2>

        <div className="flex flex-col space-y-2">

          <button
            onClick={() => setActive("overview")}
            className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 ${
              active === "overview"
                ? "bg-green-500 text-white font-semibold"
                : "text-gray-200"
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="hidden md:inline">Overview</span>
          </button>

          <button
            onClick={() => setActive("notifications")}
            className="flex items-center gap-2 text-left px-3 py-2 text-gray-200 rounded-md hover:bg-green-500"
          >
            <Bell size={18} />
            <span className="hidden md:inline">Notifications</span>
          </button>

        </div>

        {/* Product Section */}
        <div className="mt-6">

          <h2 className="text-gray-200 font-semibold mb-2 border-b border-green-300">
            Product
          </h2>

          <div className="flex flex-col space-y-2">

            <button
              onClick={() => setActive("farmer")}
              className="flex items-center gap-2 text-left px-3 py-2 text-gray-200 rounded-md hover:bg-green-500"
            >
              <Package size={18} />
              <span className="hidden md:inline">Farm Inputs</span>
            </button>

            <button
              className="flex items-center gap-2 text-left px-3 py-2 text-gray-200 rounded-md hover:bg-green-500"
            >
              <Brain size={18} />
              <span className="hidden md:inline">AI Insights</span>
            </button>

            <button
              onClick={() => setActive("Analytics")}
              className="flex items-center gap-2 text-left px-3 py-2 text-gray-200 rounded-md hover:bg-green-500"
            >
              <BarChart3 size={18} />
              <span className="hidden md:inline">Farm Analytics</span>
            </button>

            <button
              onClick={() => setActive("alerts")}
              className="flex items-center gap-2 text-left px-3 py-2 text-gray-200 rounded-md hover:bg-green-500"
            >
              <AlertCircle size={18} />
              <span className="hidden md:inline">Alerts</span>
            </button>

            <button
              onClick={() => setActive("profile")}
              className="flex items-center gap-2 text-left px-3 py-2 text-gray-200 rounded-md hover:bg-green-500"
            >
              <User size={18} />
              <span className="hidden md:inline">Farmer Profile</span>
            </button>

          </div>
        </div>

        {/* Support */}
        <div className="mt-10 border-t border-green-300 pt-3">

          <button
            onClick={() => setActive("Contact")}
            className="flex items-center gap-2 text-gray-200 px-3 py-2 rounded-md hover:bg-green-500 transition"
          >
            <Headphones size={18} />
            <span className="hidden md:inline">Contact Support</span>
          </button>

        </div>

      </aside>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto bg-green-200 p-0.2">
        {render()}
      </main>

    </div>
  );
}