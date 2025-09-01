"use client"

import {useState} from 'react';
import axiosInstance from '../API/axiosInstance';

interface Animal{
    id: number;
    name: string;
    age?: number;
    lastBirth?: string;
    lastMate?: string;
    Calf?: number;
    type: "cow" | "goat" | "chicken";
}

interface Crop {
    id: number;
    name: string;
    irrigation: boolean;
    acreage: number;
}

interface FarmData {
    farmingType: "dairy" | "goats" | "chickens" | "Mixed";
    //packagePlan: "free" | "basic" | "pro";
    animals: Animal[];
    crops: Crop[];
  }


export default function Farm() {
    const [farmingType, setFarmingType] = useState< "dairy" | "goats" | "chickens" | "mixed" | "">("")
    const [numCow, setNumCow] = useState(0)
    const [animals, setAnimals] = useState<Animal[]>([]);

    const handleSubmit = async () => {
        try{
            const res = await axiosInstance.post("/farmingData/input", {

            });
        }catch(err){

        }finally{

        }

    }
    const handleFarmingType = (e: React.ChangeEvent<HTMLSelectElement> ) => {
        setFarmingType(e.target.value as any);
    }

    const handleCowNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0
        setNumCow(value);

        setAnimals(
            Array.from({ length: value}, (_, i) => ({
                id: i + 1,
                name: "",
                age: 0,
                lastBirth: "",
                lastMate: "",
                Calf: 0,
                type: "cow" as const,
            }))
        )
    };
    const handleCowChange = (
        id: number,
        field: keyof Animal,
        value: string | number
        ) => {
            setAnimals((prev) =>
                prev.map((animal) =>
                  animal.id === id ? { ...animal, [field]: value } : animal
            )
        );
    };

    return(
        <div className="px-2 py-2 bg-green-50 shadow-sm rounded-xl">
            <div>
                <div>
                    <h3 className="text-green-600 text-center font-bold">Farm Data Collection</h3>
                    <p className="text-gray-600">Set up your farm details step by step</p>
                    <div className="mb-2">
                        <label className="block text-gray-500 font-medium mb-1">Which kind of Farming are you:</label>
                        <select
                          value={farmingType}
                          onChange={handleFarmingType}
                          className="border rounded-lg px-3 py-2 border-gray-700"
                        >
                            <option value="">-- Select Farming Type --</option>
                            <option value="dairy">Dairy Farming</option>
                            <option>Goats</option>
                            <option>Crop Farming</option>
                            <option>Mixed Farming</option>
                        </select>
                    </div>
                    
                        {farmingType === "dairy" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="font-medium text-gray-500 block">Number of cows:</label>
                                    <input
                                       min="0"
                                       max="15"
                                       type="number"
                                       value={numCow}
                                       onChange={handleCowNumber}
                                       className="border rounded-lg w-20 border-gray-700 "
                                    />
                                </div>
                                {animals.map((cow) =>(
                                    <div key={cow.id}>
                                        <div>
                                            <label className="font-medium text-gray-500">Name of cow #{cow.id}: </label>
                                            <input
                                               type="text"
                                               value={cow.name}
                                               onChange={(e) => handleCowChange(cow.id, "name",  e.target.value)}
                                               className="border border-green-300 rounded-lg "
                                            />
                                        </div>
                                        <div>
                                            <label>Age of The cow:</label>
                                            <input
                                              type="number"
                                              value={cow.age}
                                              onChange={(e) => handleCowChange(cow.id, "age", parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div>
                                            <label>LastBirth of the cow #{cow.id}:</label>
                                            <input
                                              type="text"
                                              value={cow.lastBirth}
                                              onChange={(e) => handleCowChange(cow.id, "lastBirth", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label>Last Mate Docter|| Bull #{cow.id}:</label>
                                            <input
                                              type="text"
                                              value={cow.lastMate}
                                              onChange={(e) => handleCowChange(cow.id, "lastMate", e.target.value )}
                                            />
                                        </div>
                                        <div>
                                            <label>Number of Calf(young ones) It has:</label>
                                            <input
                                              type="number"
                                              value={cow.Calf}
                                              onChange={(e) => handleCowChange(cow.id, "Calf", parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                ) )}
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}