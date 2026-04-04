'use client';

import { AlertTriangle, Banknote, Layers } from 'lucide-react';

import { Feed } from '../../types/feed';

type Props = {
  feeds: Feed[];
};

export default function FeedSummaryCards({ feeds }: Props) {
  const totalValue = feeds.reduce(
    (sum, f) => sum + f.quantity * f.costPerUnit,
    0
  );

  const totalItems = feeds.length;

  const lowStock = feeds.filter((f) => f.quantity < 10).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Stock Value - The "Money" Card */}
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

      {/* Feed Types - The "Inventory" Card */}
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

      {/* Low Stock Items - The "Action" Card */}
      <div
        className={`p-6 rounded-3xl shadow-sm border flex items-center gap-4 transition-colors ${
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
