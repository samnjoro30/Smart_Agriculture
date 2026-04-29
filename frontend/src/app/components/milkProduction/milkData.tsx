'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '../../API/axiosInstance';
import { Droplets, Landmark, ListChecks, Calendar } from 'lucide-react';

export default function MilkSummary() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get('/reproduction/milk-summary');
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load milk data');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return (
    <div className="p-6 bg-white rounded-[2.5rem] shadow-sm animate-pulse space-y-4">
      <div className="h-6 w-48 bg-gray-200 rounded-full" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-gray-100 rounded-3xl" />)}
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-50 rounded-[2.5rem] border border-red-100 text-red-600 font-bold">
      {error}
    </div>
  );

  return (
    <div className="p-8 bg-white rounded-[2.5rem] shadow-xl shadow-gray-900/5 border border-gray-50 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-gray-800 tracking-tight">Milk Production</h2>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Live Summary</p>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Droplets size={20} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard 
          label="Total Yield" 
          value={`${data.total_liters} L`} 
          icon={<Droplets size={16}/>} 
          color="bg-blue-500" 
        />
        <SummaryCard 
          label="Total Revenue" 
          value={`KES ${data.total_revenue?.toLocaleString()}`} 
          icon={<Landmark size={16}/>} 
          color="bg-emerald-500" 
        />
        <SummaryCard 
          label="Records" 
          value={data.record_count} 
          icon={<ListChecks size={16}/>} 
          color="bg-purple-500" 
        />
      </div>

      {/* Recent Records List */}
      <div>
        <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-gray-400" />
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Recent Activity</h3>
        </div>

        <div className="space-y-3">
          {data.records?.slice(0, 5).map((rec: any) => (
            <div
              key={rec.id}
              className="group flex justify-between items-center p-4 bg-gray-50 hover:bg-emerald-50/50 rounded-[1.5rem] transition-all border border-transparent hover:border-emerald-100"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                    rec.session === 'morning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                }`}>
                    {rec.session.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-black text-gray-800">
                    {rec.liters} Liters
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    {new Date(rec.created_at).toLocaleDateString()} • {rec.session}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-black text-emerald-600">
                  + KES {rec.total_revenue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sub-component for clean code
function SummaryCard({ label, value, icon, color }: any) {
  return (
    <div className="p-5 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:border-emerald-200 transition-colors">
      <div className={`p-2 rounded-lg inline-block mb-3 text-white ${color} shadow-lg shadow-gray-200`}>
        {icon}
      </div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <h3 className="text-lg font-black text-gray-800">{value}</h3>
    </div>
  );
}