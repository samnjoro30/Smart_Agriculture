'use client';

import { Trash2 } from 'lucide-react';

import { Feed } from '../../types/feed';

type Props = {
  feeds: Feed[];
  onDelete: (id: number) => void;
};

export default function FeedInventoryList({ feeds, onDelete }: Props) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">Feed Inventory</h2>

      {feeds.length === 0 ? (
        <p className="text-gray-500">No feeds added yet</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th>Name</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Cost</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {feeds.map((feed) => {
              const total = feed.quantity * feed.costPerUnit;
              const isLow = feed.quantity < 10;

              return (
                <tr
                  key={feed.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="font-medium">{feed.name}</td>

                  <td>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {feed.category}
                    </span>
                  </td>

                  <td className={isLow ? 'text-red-500 font-semibold' : ''}>
                    {feed.quantity}
                  </td>

                  <td>{feed.unit}</td>

                  <td>KES {feed.costPerUnit}</td>

                  <td className="font-semibold">KES {total}</td>

                  <td>
                    <button
                      onClick={() => onDelete(feed.id)}
                      className="p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
