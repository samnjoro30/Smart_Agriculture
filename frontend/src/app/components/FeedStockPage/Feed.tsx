'use client';

import { useState } from 'react';

import { Feed } from '../../types/feed';
import FeedInventoryList from './FeedInventory';
import AddFeedForm from './addFeed';
import FeedSummaryCards from './feedSummary';

export default function FeedStockPage() {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const addFeed = (feed: Omit<Feed, 'id'>) => {
    const newFeed: Feed = {
      ...feed,
      id: Date.now(),
    };
    setFeeds((prev) => [...prev, newFeed]);
  };

  const deleteFeed = (id: number) => {
    setFeeds((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="p-3 space-y-6">
      <AddFeedForm onAdd={addFeed} />
      <FeedSummaryCards />
      <FeedInventoryList feeds={feeds} onDelete={deleteFeed} />
    </div>
  );
}
