'use client';
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function StatsHeader({ selectedDate, onChange }: any) {
  const adjustMonth = (offset: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    onChange(newDate);
  };

  const monthName = selectedDate.toLocaleString('default', { month: 'long' });
  const year = selectedDate.getFullYear();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-black text-gray-800 tracking-tight">
          Performance Analytics
        </h1>
        <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">
          Farm Insights
        </p>
      </div>

      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-emerald-100">
        <button
          onClick={() => adjustMonth(-1)}
          className="p-2 hover:bg-emerald-50 rounded-xl transition-colors text-emerald-600"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-3 px-4 py-1 border-x border-gray-100">
          <Calendar size={18} className="text-emerald-500" />
          <span className="text-sm font-black text-gray-700 min-w-[120px] text-center">
            {monthName} {year}
          </span>
        </div>

        <button
          onClick={() => adjustMonth(1)}
          className="p-2 hover:bg-emerald-50 rounded-xl transition-colors text-emerald-600"
        >
          <ChevronRight size={20} />
        </button>

        <button className="ml-2 p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200">
          <Filter size={18} />
        </button>
      </div>
    </div>
  );
}
