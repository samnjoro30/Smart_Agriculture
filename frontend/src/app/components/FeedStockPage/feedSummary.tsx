'use client';

import { useEffect, useState } from 'react';

import { AlertTriangle, Banknote, Layers } from 'lucide-react';

import axiosInstance from '../../API/axiosInstance';
import { Feed } from '../../types/feed';

type FeedSummary = {
  totalValue: number;
  totalItems: number;
  lowStock: number;
};

export default function FeedSummaryCards() {
  const [summary, setSummary] = useState<FeedSummary>({
    totalValue: 0,
    totalItems: 0,
    lowStock: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedSummary = async () => {
      try {
        const res = await axiosInstance.get('/nutrition/feeds-stock', {
          withCredentials: true,
        });

        setSummary({
          totalValue: res.data.totalValue,
          totalItems: res.data.totalItems,
          lowStock: res.data.lowStock,
        });
      } catch (err) {
        console.error('Failed to fetch feed summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedSummary();
  }, []);

  if (loading) {
    return <p className="text-gray-400 text-sm">Loading feed summary...</p>;
  }

  const { totalValue, totalItems, lowStock } = summary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Stock Value */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="p-3 bg-green-100 text-green-700 rounded-2xl">
          <Banknote size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Total Stock Value
          </p>
          <h2 className="text-2xl font-black text-gray-900">
            <span className="text-sm font-medium mr-1 text-gray-500">KES</span>
            {totalValue.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Variety */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
          <Layers size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Variety in Store
          </p>
          <h2 className="text-2xl font-black text-gray-900">
            {totalItems}{' '}
            <span className="text-sm font-medium text-gray-500">Types</span>
          </h2>
        </div>
      </div>

      {/* Low Stock */}
      <div
        className={`p-6 rounded-3xl shadow-sm border flex items-center gap-4 ${
          lowStock > 0 ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'
        }`}
      >
        <div
          className={`p-3 rounded-2xl ${
            lowStock > 0
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <AlertTriangle size={24} strokeWidth={2.5} />
        </div>
        <div>
          <p
            className={`text-[10px] uppercase tracking-wider font-bold ${
              lowStock > 0 ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            Restock Needed
          </p>
          <h2
            className={`text-2xl font-black ${
              lowStock > 0 ? 'text-red-700' : 'text-gray-900'
            }`}
          >
            {lowStock}{' '}
            <span className="text-sm font-medium opacity-70">Items</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
