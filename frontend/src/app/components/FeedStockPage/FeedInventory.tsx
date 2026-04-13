'use client';
import {
  AlertTriangle,
  Banknote,
  Box,
  ShoppingCart,
  Trash2,
} from 'lucide-react';

import { Feed } from '../../types/feed';

type Props = {
  feeds: Feed[];
  onDelete: (id: number) => void;
};

export default function FeedInventoryList({ feeds, onDelete }: Props) {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-xl text-green-700">
            <Box size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              Feed Inventory
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Stock Management
            </p>
          </div>
        </div>
        <span className="bg-white px-3 py-1 rounded-full border border-gray-200 text-xs font-bold text-gray-500">
          {feeds.length} Items Listed
        </span>
      </div>

      <div className="p-2">
        {feeds.length === 0 ? (
          <div className="py-20 text-center">
            <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <ShoppingCart size={32} />
            </div>
            <p className="text-gray-400 font-medium">
              No feeds added yet. Start by adding your first batch.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2 px-4">
              <thead>
                <tr className="text-[10px] font-black text-gray-800 uppercase tracking-widest">
                  <th className="px-4 py-3">Feed Name</th>
                  <th className="px-4 py-3 text-center">Qty / Stock</th>
                  <th className="px-4 py-3">Unit Cost</th>
                  <th className="px-4 py-3">Total Value</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {feeds.map((feed) => {
                  const total = feed.quantity * feed.costPerUnit;
                  const isLow = feed.quantity < 10;

                  return (
                    <tr
                      key={feed.id}
                      className="group bg-green-100 hover:bg-gray-50 transition-all duration-200"
                    >
                      {/* Name & Category */}
                      <td className="px-4 py-4 rounded-l-2xl border-y border-l border-gray-50 group-hover:border-green-100">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 text-sm">
                            {feed.name}
                          </span>
                          <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                            {feed.category}
                          </span>
                        </div>
                      </td>

                      {/* Quantity with Low Stock Alert */}
                      <td className="px-4 py-4 border-y border-gray-50 group-hover:border-green-100 text-center">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl border ${
                            isLow
                              ? 'bg-red-50 border-red-100 text-red-600'
                              : 'bg-green-50 border-green-100 text-green-700'
                          }`}
                        >
                          {isLow && (
                            <AlertTriangle
                              size={12}
                              className="animate-pulse"
                            />
                          )}
                          <span className="text-sm font-black">
                            {feed.quantity}
                          </span>
                          <span className="text-[10px] opacity-70 font-bold uppercase">
                            {feed.unit}
                          </span>
                        </div>
                      </td>

                      {/* Cost Per Unit */}
                      <td className="px-4 py-4 border-y border-gray-50 group-hover:border-green-100">
                        <div className="flex items-center gap-1.5 text-gray-800 font-medium">
                          <Banknote size={14} className="text-gray-300" />
                          <span className="text-sm">
                            KES {feed.costPerUnit.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* Total Value */}
                      <td className="px-4 py-4 border-y border-gray-800 group-hover:border-green-100">
                        <span className="text-sm font-black text-gray-900">
                          KES {total.toLocaleString()}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 rounded-r-2xl border-y border-r border-gray-50 group-hover:border-green-100 text-right">
                        <button
                          onClick={() => onDelete(feed.id)}
                          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                          title="Delete Feed"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
