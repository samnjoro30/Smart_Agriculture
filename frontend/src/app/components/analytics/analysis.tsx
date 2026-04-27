import React from 'react';

import { useAnalytics } from '../../hooks/analyticAPICalls';
import { KPIGrid } from './KPIGrid';
import { TopCowsChart } from './effeciency';
import { SessionRevenueChart } from './performance';
import { ProductionTrendChart } from './productionTrendChart';
import StatsHeader from './statsHead';

export default function Analysis() {
  const { date, setDate, data, loading, error } = useAnalytics();

  if (error)
    return (
      <div className="p-10 text-red-500">Error loading analytics: {error}</div>
    );

  return (
    <main className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <StatsHeader selectedDate={date} onChange={setDate} />

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-emerald-600 font-bold animate-pulse">
            Calculating Farm Analytics...
          </p>
        </div>
      ) : (
        <>
          {/* 2. Top Level KPIs - Passing summary data */}
          <KPIGrid data={data?.summary} loading={loading} />

          {/* 3. Primary Line Graph - Passing trends data */}
          <section className="bg-white p-6 rounded-[2rem] shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-4">
              Production Trend (Liters)
            </h3>
            <ProductionTrendChart data={data.trends} />
          </section>

          {/* 4. Two Graphs in a Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded-[2rem] shadow-sm border">
              <h3 className="font-bold text-gray-800 mb-4">
                Revenue by Session
              </h3>
              {/* Corrected component name and prop */}
              <SessionRevenueChart data={data.sessions} />
            </section>

            <section className="bg-white p-6 rounded-[2rem] shadow-sm border">
              <h3 className="font-bold text-gray-800 mb-4">
                Top 5 Performing Cows
              </h3>
              {/* Corrected casing from topCowsChart to TopCowsChart */}
              <TopCowsChart data={data.ranking} />
            </section>
          </div>
        </>
      )}
    </main>
  );
}
