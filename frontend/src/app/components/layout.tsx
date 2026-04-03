"use client"

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Bell,
  Package,
  Brain,
  BarChart3,
  AlertCircle,
  User,
  Headphones,
  Home,
  Menu,
  X
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  // Mobile bottom navigation items
  const mobileNavItems = [
    { id: "overview", label: "Home", icon: Home },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "farmer", label: "Farm", icon: Package },
    { id: "Analytics", label: "Stats", icon: BarChart3 },
    { id: "profile", label: "Profile", icon: User },
  ];

  // All navigation items for mobile drawer
  const allNavItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, section: "main" },
    { id: "notifications", label: "Notifications", icon: Bell, section: "main" },
    { id: "farmer", label: "Farm Inputs", icon: Package, section: "product" },
    { id: "AI Insights", label: "AI Insights", icon: Brain, section: "product" },
    { id: "Analytics", label: "Farm Analytics", icon: BarChart3, section: "product" },
    { id: "alerts", label: "Alerts", icon: AlertCircle, section: "product" },
    { id: "profile", label: "Farmer Profile", icon: User, section: "product" },
    { id: "Contact", label: "Contact Support", icon: Headphones, section: "support" },
  ];

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
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
          className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 ${
            active === "notifications"
              ? "bg-green-500 text-white font-semibold"
              : "text-gray-200"
          }`}
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
            className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 ${
              active === "farmer"
                ? "bg-green-500 text-white font-semibold"
                : "text-gray-200"
            }`}
          >
            <Package size={18} />
            <span className="hidden md:inline">Farm Inputs</span>
          </button>

          <button
            onClick={() => setActive("AI Insights")}
            className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 ${
              active === "AI Insights"
                ? "bg-green-500 text-white font-semibold"
                : "text-gray-200"
            }`}
          >
            <Brain size={18} />
            <span className="hidden md:inline">AI Insights</span>
          </button>

          <button
            onClick={() => setActive("Analytics")}
            className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 ${
              active === "Analytics"
                ? "bg-green-500 text-white font-semibold"
                : "text-gray-200"
            }`}
          >
            <BarChart3 size={18} />
            <span className="hidden md:inline">Farm Analytics</span>
          </button>

          <button
            onClick={() => setActive("alerts")}
            className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 ${
              active === "alerts"
                ? "bg-green-500 text-white font-semibold"
                : "text-gray-200"
            }`}
          >
            <AlertCircle size={18} />
            <span className="hidden md:inline">Alerts</span>
          </button>

          <button
            onClick={() => setActive("profile")}
            className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 ${
              active === "profile"
                ? "bg-green-500 text-white font-semibold"
                : "text-gray-200"
            }`}
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
          className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 transition ${
            active === "Contact"
              ? "bg-green-500 text-white font-semibold"
              : "text-gray-200"
          }`}
        >
          <Headphones size={18} />
          <span className="hidden md:inline">Contact Support</span>
        </button>
      </div>
    </aside>
  );

  // Mobile Bottom Navigation
  const MobileBottomNav = () => (
    <>
      {/* Menu Button - Floating Action Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="fixed bottom-20 right-4 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg md:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-green-400 shadow-lg border-t border-gray-200 md:hidden rounded-t-xl z-40">
        <div className="flex justify-around items-center py-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                  active === item.id
                    ? "text-green-600"
                    : "text-gray-600 hover:text-green-500"
                }`}
              >
                <Icon size={22} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu for additional items */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-50 md:hidden max-h-[70vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {/* Main Section */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-2">MAIN</h4>
                <div className="space-y-1">
                  {allNavItems.filter(item => item.section === "main").map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActive(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          active === item.id
                            ? "bg-green-50 text-green-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Section */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-2">PRODUCT</h4>
                <div className="space-y-1">
                  {allNavItems.filter(item => item.section === "product").map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActive(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          active === item.id
                            ? "bg-green-50 text-green-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Support Section */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-2">SUPPORT</h4>
                <div className="space-y-1">
                  {allNavItems.filter(item => item.section === "support").map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActive(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          active === item.id
                            ? "bg-green-50 text-green-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="flex h-[calc(100vh-100px)] relative">
      {/* Desktop Sidebar - hidden on mobile */}
      {!isMobile && <DesktopSidebar />}
      
      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto bg-green-50 p-0.2 pb-16 md:pb-0">
        {render()}
      </main>

      {/* Mobile Bottom Navigation - only on mobile */}
      {isMobile && <MobileBottomNav />}
    </div>
  );
}