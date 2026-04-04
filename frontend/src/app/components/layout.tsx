'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import {
  AlertCircle,
  BarChart3,
  Bell,
  Brain,
  Headphones,
  Home,
  LayoutDashboard,
  Menu,
  Package,
  User,
  X,
} from 'lucide-react';

import Overview from './overview';

const Profile = dynamic(() => import('./profile'), {
  loading: () => <p>Loading...</p>,
});
const NotificationComponent = dynamic(() => import('./notification'), {
  loading: () => <p>Loading...</p>,
});
const FarmerInput = dynamic(() => import('./FarmerInput'), {
  loading: () => <p>Loading...</p>,
});
const Contact = dynamic(() => import('./contact'), {
  loading: () => <p>Loading...</p>,
});
const FarmAnalytics = dynamic(() => import('./FarmAnalytics'), {
  loading: () => <p>Loading...</p>,
});
const Alerts = dynamic(() => import('./alerts'), {
  loading: () => <p>Loading alerts...</p>,
});

const mobileNavItems = [
  { id: 'overview', label: 'Home', icon: Home },
  { id: 'farmer', label: 'Inputs', icon: Package },
  { id: 'Analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'alerts', label: 'Alerts', icon: AlertCircle },
  { id: 'profile', label: 'Profile', icon: User },
];

const drawerSections = [
  {
    title: 'Main',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'notifications', label: 'Notifications', icon: Bell },
    ],
  },
  {
    title: 'Product',
    items: [
      { id: 'farmer', label: 'Farm Inputs', icon: Package },
      { id: 'AI Insights', label: 'AI Insights', icon: Brain },
      { id: 'Analytics', label: 'Farm Analytics', icon: BarChart3 },
      { id: 'alerts', label: 'Alerts', icon: AlertCircle },
      { id: 'profile', label: 'Farmer Profile', icon: User },
    ],
  },
  {
    title: 'Support',
    items: [{ id: 'Contact', label: 'Contact Support', icon: Headphones }],
  },
];

export default function Sidebar() {
  const [active, setActive] = useState('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = (id: any) => {
    setActive(id);
    setDrawerOpen(false);
  };

  const render = () => {
    switch (active) {
      case 'overview':
        return <Overview />;
      case 'notifications':
        return <NotificationComponent />;
      case 'profile':
        return <Profile />;
      case 'Contact':
        return <Contact />;
      case 'farmer':
        return <FarmerInput />;
      case 'Analytics':
        return <FarmAnalytics />;
      case 'alerts':
        return <Alerts />;
      default:
        return <p className="p-4 text-gray-500">Coming soon</p>;
    }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-100px)]">
        {/* ── Desktop sidebar (unchanged) ── */}
        <aside className="hidden md:flex flex-col ml-0.5 w-16 md:w-64 bg-green-700 shadow-md rounded-lg p-1 md:p-4 mb-0.5 overflow-y-auto">
          <h2 className="text-gray-200 font-semibold mb-2 border-b border-green-300">
            Dashboard
          </h2>
          <div className="flex flex-col space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'notifications', label: 'Notifications', icon: Bell },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 transition-colors ${active === id ? 'bg-green-500 text-white font-semibold' : 'text-gray-200'}`}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-gray-200 font-semibold mb-2 border-b border-green-300">
              Product
            </h2>
            <div className="flex flex-col space-y-2">
              {[
                { id: 'farmer', label: 'Farm Inputs', icon: Package },
                { id: 'AI Insights', label: 'AI Insights', icon: Brain },
                { id: 'Analytics', label: 'Farm Analytics', icon: BarChart3 },
                { id: 'alerts', label: 'Alerts', icon: AlertCircle },
                { id: 'profile', label: 'Farmer Profile', icon: User },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`flex items-center gap-2 text-left px-3 py-2 rounded-md hover:bg-green-500 transition-colors ${active === id ? 'bg-green-500 text-white font-semibold' : 'text-gray-200'}`}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto border-t border-green-300 pt-3">
            <button
              onClick={() => setActive('Contact')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-500 transition-colors w-full ${active === 'Contact' ? 'bg-green-500 text-white font-semibold' : 'text-gray-200'}`}
            >
              <Headphones size={18} />
              <span className="hidden md:inline">Contact Support</span>
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto bg-green-50 pb-16 md:pb-0">
          {render()}
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 
        mx-1 mb-1 rounded-2xl bg-green-700/95 backdrop-blur-md shadow-lg"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex justify-around items-center px-1 py-1.5">
          {mobileNavItems.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;

            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                className="flex flex-col items-center flex-1 relative py-1"
              >
                {/* Active indicator (smaller + tighter) */}
                {isActive && (
                  <span className="absolute -top-1 w-4 h-[2px] bg-white rounded-full" />
                )}

                {/* Icon (smaller container) */}
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${
                    isActive ? 'bg-white/20 scale-105' : ''
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.3 : 1.8}
                    className={isActive ? 'text-white' : 'text-green-300'}
                  />
                </span>

                {/* Label (smaller + tighter) */}
                <span
                  className={`text-[9px] leading-none mt-0.5 ${
                    isActive ? 'text-white' : 'text-green-300'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center flex-1 py-1"
          >
            <span className="flex items-center justify-center w-8 h-4">
              <Menu size={18} className="text-green-300" />
            </span>
            <span className="text-[9px] mt-0.5 text-green-300">More</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile slide-up drawer ── */}
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Sheet */}
          <div
            className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white rounded-t-3xl left-2 right-2 max-h-[60vh] flex flex-col"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
              <span className="text-base font-semibold text-gray-800">
                Menu
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Sections */}
            <div className="overflow-y-auto flex-1 px-4 py-3 space-y-5">
              {drawerSections.map((section) => (
                <div key={section.title}>
                  <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5 px-1">
                    {section.title}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map(({ id, label, icon: Icon }) => {
                      const isActive = active === id;
                      return (
                        <button
                          key={id}
                          onClick={() => navigate(id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                            isActive
                              ? 'bg-green-50 text-green-700 border-l-2 border-green-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon
                            size={18}
                            strokeWidth={isActive ? 2.2 : 1.8}
                            className={
                              isActive ? 'text-green-600' : 'text-gray-500'
                            }
                          />
                          <span
                            className={`text-sm ${isActive ? 'font-semibold' : 'font-normal'}`}
                          >
                            {label}
                          </span>
                          {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
