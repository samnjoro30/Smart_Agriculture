import { useEffect, useState } from "react";
import { Users, Milk, AlertTriangle, TrendingUp, Loader2 } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

interface DashboardStats {
  admin_name: string;
  total_farmers: number;
  livestock_monitored: number;
  active_alerts: number;
  revenue: number;
}

export default function Overview() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/admin/auth/overview-stats");
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  const statsCards = [
    { label: "Total Farmers", value: data?.total_farmers.toLocaleString(), icon: Users, color: "bg-blue-500", trend: "+12%" },
    { label: "Livestock Monitored", value: data?.livestock_monitored.toLocaleString(), icon: Milk, color: "bg-green-500", trend: "+5%" },
    { label: "Active Alerts", value: data?.active_alerts, icon: AlertTriangle, color: "bg-red-500", trend: "-2%" },
    { label: "Revenue (KES)", value: data?.revenue.toLocaleString(), icon: TrendingUp, color: "bg-purple-500", trend: "+18%" },
  ];

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500">
      
      {/* 🔹 Welcome Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {data?.admin_name.split(' ')[0] || "Admin"} 👋
        </h2>
        <p className="text-gray-500 text-sm">
          Here is what's happening with the Smart Farm network today.
        </p>
      </div>

      {/* 🔹 Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-default">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl text-white ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-50 text-green-700">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80 flex flex-col">
           <h3 className="font-bold text-gray-800 mb-4">Farmer Onboarding Trend</h3>
           <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-50 rounded-xl">
              <p className="text-gray-400 text-sm italic">Analytics Visualization Pending</p>
           </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Recent Registrations</h3>
            <button className="text-green-600 text-xs font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                  U{i}
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-medium">New Farmer Joined</p>
                  <p className="text-[11px] text-gray-400">ID: 3b37a589... • 4h ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}