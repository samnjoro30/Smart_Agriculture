'use client';

import { useState } from 'react';

import FeedStockPage from './FeedStockPage/Feed';
import Tabs from './farmdata/tabs';
import AnimalsList from './livestock/ListAnimals';
import RegisterAnimal from './livestock/RegisterAnimals';
import LivestockOverview from './livestock/overviewAnimals';

//import axiosInstance from '../API/axiosInstance';

export default function Farm() {
  const [activeTab, setActiveTab] = useState('animals');

  return (
    <div className="p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-2">
        {activeTab === 'overview' && <LivestockOverview />}
        {activeTab === 'register' && <RegisterAnimal />}
        {activeTab === 'animals' && <AnimalsList />}
        {activeTab === 'Feed stock' && <FeedStockPage />}
      </div>
    </div>
  );
}
