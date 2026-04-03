"use client"

import {useState} from 'react';
import Tabs from './farmdata/tabs';
import LivestockOverview from './livestock/overviewAnimals';
import RegisterAnimal from './livestock/RegisterAnimals';
import AnimalsList from './livestock/ListAnimals';
import FeedStockPage from './FeedStockPage/Feed';
//import axiosInstance from '../API/axiosInstance';


export default function Farm() {
    const [activeTab, setActiveTab] = useState("overview")
    

    return(
        <div className="p-4">
            <Tabs 
               activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
            <div className="mt-2">
                {activeTab === 'overview' && <LivestockOverview />}
                {activeTab === 'register' && <RegisterAnimal />}
                {activeTab === 'animals' && <AnimalsList />}
                {activeTab === 'Feed stock' && <FeedStockPage />}

            </div>
          
        </div>
    )
}