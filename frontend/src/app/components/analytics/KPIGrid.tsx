'use client';

import React from 'react';
import {
  Activity,
  Droplets,
  Landmark,
  Pizza,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

/**
 * Individual KPI Card Component
 * Uses Glassmorphism and subtle animations
 */
const KPICard = ({
  title,
  value,
  subtext,
  icon: Icon,
  color,
  isPositive,
}: any) => {
  // Safe color replacement for dynamic text/bg styling
  const textColorClass = color.replace('bg-', 'text-');
  const bgColorClass = color.replace('bg-', 'bg-opacity-10 bg-');

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-900/5 relative overflow-hidden group transition-all hover:scale-[1.02]">
      {/* Decorative Background Blob */}
      <div
        className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-110 transition-transform ${color}`}
      />

      <div className="relative z-10 space-y-4">
        <div className={`p-3 rounded-2xl inline-block ${bgColorClass} ${textColorClass}`}>
          <Icon size={24} />
        </div>

        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {title}
          </p>
          <h3 className="text-2xl font-black text-gray-800 mt-1">{value}</h3>
        </div>

        <div className="flex items-center gap-1.5">
          {isPositive !== undefined && (
            isPositive ? (
              <TrendingUp size={14} className="text-emerald-500" />
            ) : (
              <TrendingDown size={14} className="text-amber-500" />
            )
          )}
          <span
            className={`text-[11px] font-bold ${isPositive ? 'text-emerald-600' : 'text-amber-600'}`}
          >
            {subtext}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Main KPI Grid Component
 * Includes safety checks to prevent 'undefined' crashes
 */
export function KPIGrid({ data, loading }: { data: any; loading?: boolean }) {
  
  // 1. Loading State (Skeleton)
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-[2.5rem]" />
        ))}
      </div>
    );
  }

  // 2. Data Fallbacks (Prevents .toFixed or .toLocaleString errors)
  const stats = {
    total_liters: data?.total_liters ?? 0,
    average_per_cow: data?.average_per_cow ?? 0,
    milk_revenue: data?.milk_revenue ?? 0,
    net_balance: data?.net_balance ?? 0,
    status: data?.status ?? 'SURPLUS'
  };

  const isSurplus = stats.net_balance >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 1. Total Yield */}
      <KPICard
        title="Total Milk Yield"
        value={`${stats.total_liters.toLocaleString()} L`}
        subtext="Total Monthly Liters"
        icon={Droplets}
        color="bg-blue-500"
      />

      {/* 2. Efficiency Score */}
      <KPICard
        title="Avg Yield/Cow"
        // Number() and toFixed safety
        value={`${Number(stats.average_per_cow).toFixed(1)} L`}
        subtext="Efficiency per Animal"
        icon={Activity}
        color="bg-purple-500"
      />

      {/* 3. Gross Revenue */}
      <KPICard
        title="Milk Revenue"
        value={`KES ${stats.milk_revenue.toLocaleString()}`}
        subtext="Gross Monthly Income"
        icon={Landmark}
        color="bg-emerald-500"
        isPositive={true}
      />

      {/* 4. Financial Health (Surplus/Deficit) */}
      <KPICard
        title={isSurplus ? 'Surplus' : 'Deficit'}
        value={`KES ${Math.abs(stats.net_balance).toLocaleString()}`}
        subtext={isSurplus ? 'Above Feed Costs' : 'Below Feed Costs'}
        icon={Pizza}
        color={isSurplus ? 'bg-emerald-600' : 'bg-red-500'}
        isPositive={isSurplus}
      />
    </div>
  );
}