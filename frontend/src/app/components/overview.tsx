'use client';

import { useEffect, useState } from 'react';

import {
  Activity,
  ArrowUpRight,
  Landmark,
  Mail,
  Phone,
  Sparkles,
  Stethoscope,
  User,
  Users,
  Wheat,
} from 'lucide-react';

import axiosInstance from '../API/axiosInstance';

interface User {
  farmname: string;
  username: string;
  email: string;
  phonenumber: string;
}

interface FarmStats {
  totalAnimals: number;
  pregnant: number;
  treatment: number;
  feedStatus: string;
}

interface Activity {
  id: number;
  message: string;
  time: string;
}

export default function Overview() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<FarmStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('/farm/farm-profile');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load user', err);
    }
  };
  const fetchStats = async () => {
    try {
      const res = await axiosInstance.get('/livestock/stats');
      setStats(res.data.stats);
    } catch (err: any) {
      console.error('Failed to load stats', err);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchStats();
    // fetchStats()
    // fetchActivity()
  }, []);

  const greeting =
    new Date().getHours() < 12
      ? 'Good morning'
      : new Date().getHours() < 18
        ? 'Good afternoon'
        : 'Good evening';

  return (
    <div className="bg-white min-h-screen p-4 md:p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 bg-white ">
        <h2 className="text-2xl font-bold text-orange-800 mb-1">
          {greeting}, {user?.username} 👋
        </h2>

        <div className="relative group max-w-2xl">
          {/* A very subtle vertical accent line to anchor the text */}
          <div className="absolute -left-4 top-1 bottom-1 w-0.5 bg-gradient-to-b from-green-500/50 to-transparent rounded-full"></div>

          <p className="text-gray-800 text-sm md:text-base leading-relaxed tracking-wide">
            <span className="italic font-medium text-gray-400">
              You’re currently overseeing operations at
            </span>{' '}
            <span className="relative inline-block font-black text-gray-900 group-hover:text-green-700 transition-colors duration-300">
              {user?.farmname}
              {/* Subtle underline accent for the farm name */}
              <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-green-100 rounded-full -z-10 transition-all group-hover:h-2 group-hover:bg-green-50"></span>
            </span>
            <span className="block mt-2 text-gray-400 font-medium">
              Keep track of your livestock health, monitor productivity, and
              stay ahead with{' '}
              <span className="not-italic font-bold text-gray-700 inline-flex items-center gap-1">
                real-time insights
                <Sparkles size={14} className="text-orange-400 animate-pulse" />
              </span>
            </span>
          </p>
        </div>
      </div>

      {/* Farm Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          {
            label: 'Total Animals',
            value: stats?.totalAnimals,
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
          },
          {
            label: 'Pregnant Cows',
            value: stats?.pregnant,
            icon: Activity,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-100',
          },
          {
            label: 'Under Treatment',
            value: stats?.treatment,
            icon: Stethoscope,
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-red-100',
          },
          {
            label: 'Feed Stock',
            value: stats?.feedStatus,
            icon: Wheat,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-100',
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-white p-5 rounded-[2rem] border-2 ${item.border} shadow-sm hover:shadow-md transition-all group`}
          >
            {/* Decorative background shape */}
            <div
              className={`absolute -right-4 -top-4 w-16 h-16 ${item.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}
            ></div>

            <div className="relative z-10">
              <div
                className={`p-3 w-fit rounded-2xl mb-4 ${item.bg} ${item.color}`}
              >
                <item.icon size={22} strokeWidth={2.5} />
              </div>

              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">
                {item.label}
              </p>

              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                  {item.value ?? '--'}
                </h3>
                {/* Sub-label for context */}
                <span className="text-[10px] font-bold text-gray-400">
                  Live
                </span>
              </div>

              {/* <div
                className={`mt-3 flex items-center gap-1 text-[10px] font-bold ${item.color} bg-white border ${item.border} w-fit px-2 py-0.5 rounded-lg`}
              >
                <ArrowUpRight size={10} /> View Details
              </div> */}
            </div>
          </div>
        ))}
      </div>
      {/* Farmer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Farmer Identity Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-green-100 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.15em] flex items-center gap-2">
                <User size={16} className="text-green-600" />
                Farmer Details
              </h3>
              <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-lg">
                Primary Account
              </span>
            </div>

            {user ? (
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">
                    Full Name
                  </span>
                  <span className="text-lg font-extrabold text-gray-900">
                    {user.username}
                  </span>
                </div>

                <div className="flex flex-col p-3 bg-gray-50 rounded-2xl border border-transparent group-hover:border-green-100 transition-colors">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                    <Mail size={12} /> Email Address
                  </span>
                  <span className="text-sm font-semibold text-gray-700 break-all">
                    {user.email}
                  </span>
                </div>
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                <div className="h-12 bg-gray-100 rounded-2xl"></div>
              </div>
            )}
          </div>
        </div>

        {/* Farm Property Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-green-100 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.15em] flex items-center gap-2">
                <Landmark size={16} className="text-green-600" />
                Farm Identity
              </h3>
              <button className="text-green-600 hover:bg-green-50 p-1.5 rounded-xl transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>

            {user ? (
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">
                    Farm Registered Name
                  </span>
                  <span className="text-lg font-extrabold text-gray-900">
                    {user.farmname}
                  </span>
                </div>

                <div className="flex flex-col p-3 bg-gray-50 rounded-2xl border border-transparent group-hover:border-green-100 transition-colors">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                    <Phone size={12} /> Contact Number
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {user.phonenumber}
                  </span>
                </div>
              </div>
            ) : (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                <div className="h-12 bg-gray-100 rounded-2xl"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Updates + Insights */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-5 rounded-xl shadow-sm">
          <h3 className="text-green-700 font-semibold mb-3">
            Latest Livestock Updates
          </h3>

          <ul className="space-y-3 text-gray-700 text-sm">
            <li>🐄 Early heat detection improves conception success.</li>
            <li>🥛 Balanced dairy feed increases milk yield and fertility.</li>
            <li>
              💉 Regular vaccination protects livestock from disease outbreaks.
            </li>
          </ul>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow-sm">
          <h3 className="text-green-700 font-semibold mb-3">
            Smart Farm Insights
          </h3>

          <ul className="space-y-3 text-gray-700 text-sm">
            <li>
              📊 Tracking reproduction cycles helps improve herd fertility.
            </li>
            <li>🌾 Monitoring feed consumption reduces waste and cost.</li>
            <li>
              💰 Recording expenses and milk sales helps track profitability.
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-green-50 p-5 rounded-xl shadow-sm">
        <h3 className="text-green-700 font-semibold mb-4">
          Recent Farm Activity
        </h3>

        <ul className="space-y-3 text-sm text-gray-700">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <li
                key={activity.id}
                className="flex justify-between border-b pb-2"
              >
                <span>{activity.message}</span>
                <span className="text-gray-400 text-xs">{activity.time}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No recent activity recorded.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
