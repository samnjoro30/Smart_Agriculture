"use client"

import { useState } from "react";
import AddFeedForm from "./addFeed";
import FeedInventoryList from "./FeedInventory";
import FeedSummaryCards from "./feedSummary";
import { Feed } from "../../types/feed";

export default function FeedStockPage() {
  const [feeds, setFeeds] = useState<Feed[]>([])

  const addFeed = (feed: Omit<Feed, "id">) => {
    const newFeed: Feed = {
      ...feed,
      id: Date.now()
    }
    setFeeds((prev) => [...prev, newFeed])
  }

  const deleteFeed = (id: number) => {
    setFeeds((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <AddFeedForm onAdd={addFeed} />
      <FeedSummaryCards feeds={feeds} />
      <FeedInventoryList feeds={feeds} onDelete={deleteFeed} />
    </div>
  )
}