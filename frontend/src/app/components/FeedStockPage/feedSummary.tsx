"use client"

import { Feed } from "../../types/feed"

type Props = {
  feeds: Feed[]
}

export default function FeedSummaryCards({ feeds }: Props) {
  const totalValue = feeds.reduce(
    (sum, f) => sum + f.quantity * f.costPerUnit,
    0
  )

  const totalItems = feeds.length

  const lowStock = feeds.filter((f) => f.quantity < 10).length

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Total Stock Value</p>
        <h2 className="text-xl font-semibold">KES {totalValue}</h2>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Feed Types</p>
        <h2 className="text-xl font-semibold">{totalItems}</h2>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow">
        <p className="text-sm text-gray-500">Low Stock Items</p>
        <h2 className="text-xl font-semibold text-red-500">
          {lowStock}
        </h2>
      </div>
    </div>
  )
}