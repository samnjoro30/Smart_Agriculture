import { useEffect, useState } from "react";
import { Dog, Activity, HeartPulse, ShieldAlert, Loader2 } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

export default function Livestock() {
  interface LivestockStats {
    total_animals: number;
    status_summary: {
      Healthy: number;
      Sick: number;
    };
    active_monitoring: number;
    species_breakdown: { species: string; count: number; healthIndex: number }[];
  }

  const [stats, setStats] = useState<LivestockStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        const res = await axiosInstance.get("/admin/auth/livestock-stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLivestock();
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-green-600" /></div>;

  const cards = [
    { label: "Total Population", value: stats?.total_animals, icon: Dog, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Healthy", value: stats?.status_summary?.Healthy || 0, icon: HeartPulse, color: "text-green-600", bg: "bg-green-50" },
    { label: "Needs Attention", value: stats?.status_summary?.Sick || 0, icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50" },
    { label: "IoT Monitored", value: stats?.active_monitoring, icon: Activity, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Livestock Oversight</h2>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border shadow-sm">
          Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* 🔹 Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-lg flex items-center justify-center mb-3`}>
              <card.icon size={20} />
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase">{card.label}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{(card.value ?? 0).toLocaleString()}</h3>
          </div>
        ))}
      </div>

      {/* 🔹 Species Breakdown Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-bold text-gray-800">Distribution by Species</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold">
            <tr>
              <th className="px-6 py-3">Species</th>
              <th className="px-6 py-3">Count</th>
              <th className="px-6 py-3">Global Health Index</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {stats?.species_breakdown?.map((item: { species: string; count: number; healthIndex: number }, i: number) => (
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-700 capitalize">{item.species}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.count}</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: '85%' }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}