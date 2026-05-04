import { useEffect, useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Lightbulb, 
  ChevronRight,
  Loader2
} from "lucide-react";
import axiosInstance from "../api/axiosInstance";

interface ReportData {
  generated_at: string;
  period: string;
  performance_index: number;
  metrics: {
    user_growth: number;
    revenue: number;
    revenue_split: Record<string, number>;
    livestock_health: {
      pregnant: number;
      in_heat: number;
    };
  };
  recommendations: string[];
}

export default function Reports() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetchReport();
  }, [days]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/auth/reports/summary?days=${days}`);
      setData(res.data);
    } catch (err) {
      console.error("Report fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-green-600" /></div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">System Analytics</h2>
          <p className="text-sm text-gray-500">Comprehensive performance audit for {data?.period}.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                days === d ? "bg-green-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {d}D
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 🔹 Performance Index Gauge */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Platform Health Score</h3>
          <div className="relative flex items-center justify-center">
            {/* Simple CSS Circle Gauge */}
            <svg className="w-32 h-32">
              <circle className="text-gray-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
              <circle className="text-green-500" strokeWidth="8" strokeDasharray={364} strokeDashoffset={364 - (364 * (data?.performance_index || 0)) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
            </svg>
            <span className="absolute text-3xl font-black text-gray-800">{data?.performance_index}%</span>
          </div>
          <p className="mt-6 text-sm text-gray-500">Based on user growth and revenue stability.</p>
        </div>

        {/* 🔹 Growth Summary Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <TrendingUp size={20} />
              <h4 className="font-bold text-gray-800">User Acquisition</h4>
            </div>
            <h3 className="text-4xl font-bold text-gray-900">+{data?.metrics.user_growth}</h3>
            <p className="text-sm text-gray-500 mt-2">New farmers registered in this period.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 text-purple-600 mb-4">
              <Activity size={20} />
              <h4 className="font-bold text-gray-800">Reproduction Health</h4>
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-2xl font-bold text-gray-900">{data?.metrics.livestock_health.pregnant}</p>
                    <p className="text-xs text-gray-400 uppercase font-bold">Pregnant</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{data?.metrics.livestock_health.in_heat}</p>
                    <p className="text-xs text-gray-400 uppercase font-bold">In Heat</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Recommendations & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="text-yellow-400" size={24} />
            <h3 className="text-xl font-bold">AI Business Insights</h3>
          </div>
          <ul className="space-y-4">
            {data?.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <ChevronRight className="text-green-400 mt-1 shrink-0" size={16} />
                <p className="text-sm text-gray-300 leading-relaxed">{rec}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 🔹 Revenue Split Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-green-600" /> Revenue Stream Breakdown
          </h3>
          <div className="space-y-5">
            {Object.entries(data?.metrics.revenue_split || {}).map(([category, amount]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium capitalize">{category}</span>
                  <span className="text-gray-900 font-bold">KES {amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full rounded-full" 
                    style={{ width: `${(amount / (data?.metrics.revenue || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}