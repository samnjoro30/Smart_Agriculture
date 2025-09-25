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
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('')
    const [numCow, setNumCow] = useState(0);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [step, setStep] = useState<number>(0);

    const handleCowSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        try{
            const res = await axiosInstance.post("/farmingData/input/cow", {
                

            });
            const Data = res.data.message;
            setMessage(Data || "Registration successful");
            setTimeout(() => setMessage(''), 2000);
        }catch(err){


        }finally{
            setLoading(false);

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
        );
        setStep(0);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg p-3 bg-gray-50 h-auto">
            <div className="space-y-6">
                <div className="bg-green-50 shadow-md rounded-2xl p-6">
                    <h3 className="text-green-600 text-center font-bold">Farm Data Collection</h3>
                    <p className="text-gray-600 text-sm mb-4 text-center">Set up your farm details step by step</p>
                    <div className="mb-2">
                        <label className="block text-gray-800 font-medium mb-1">Farm Setup:</label>
                        <select
                          value={farmingType}
                          onChange={handleFarmingType}
                          className="border rounded-lg px-3 py-2 border-gray-700 w-full"
                        >
                            <option value="">-- Select Farming Type --</option>
                            <option value="dairy">Dairy Farming</option>
                            <option value="goats">Goats</option>
                            {/* <option value="">Crop Farming</option>
                            <option value="mixed">Mixed Farming</option> */}
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
                                  className="border rounded-lg w-20 border-gray-700 text-gray-800"
                                />
                            </div>
                        </div>
                    )}

                    {farmingType === 'goats' && (
                        <div className="space-y-4">
                            <div>
                                <label className="font-medium text-gray-500 block">Number of Goats:</label>
                                <input
                                  min="0"
                                  max="10"
                                  type="number"
                                  value={numCow}
                                  onChange={handleCowNumber}
                                  className="border rounded-lg w-20 border-gray-700 text-gray-800"
                                />
                            </div>
                        </div>
                    )}
                </div>
                     
                     {/*Cow management*/}
                        {farmingType ==="dairy" && animals.length >0 &&(
                            <div className="bg-green-50 shadow-sm rounded-2xl p-2 border border-gray-200">
                                <form onSubmit={handleCowSubmit}
                                  onKeyDown={(e) =>{
                                    if (e.key === "Enter") {
                                      e.preventDefault(); 
                                    }
                                  }}
                                >
                                <div className="flex items-center justify-center mb-6 space-x-2">
                                    {animals.map((_, i) => (
                                        <div
                                           key={i}
                                           className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                               i === step ? "bg-green-600 w-6" : "bg-gray-300"
                                           }`}
                                        />
                                    ))}
                                </div>
                                <h3 className="text-green-600 text-lg font-bold mb-4 text-center">
                                    Cow Details <span className="text-gray-500">(Cow {step + 1} of {animals.length})</span>
                                </h3>
                                {animals[step] && (
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="">
                                                <label className="block font-medium text-gray-500 mb-1">Name of cow: </label>
                                                <input
                                                  type="text"
                                                  value={animals[step].name}
                                                  onChange={(e) => handleCowChange(animals[step].id, "name",  e.target.value)}
                                                  className="border px-1 py-1 border-green-300 rounded-lg "
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-500">Age of The cow:</label>
                                                <input
                                                  type="number"
                                                  value={animals[step].age}
                                                  onChange={(e) => handleCowChange(animals[step].id, "age", parseInt(e.target.value) || 0)}
                                                  className="border border-green-300 px-1 py-1 rounded-lg "
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-500">LastBirth of the cow:</label>
                                                <input
                                                  type="text"
                                                  value={animals[step].lastBirth}
                                                  onChange={(e) => handleCowChange(animals[step].id, "lastBirth", e.target.value)}
                                                  className="border border-green-300 px-1 py-1 rounded-lg "
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div >
                                                <label className="block font-medium text-gray-500">Last Mate Docter|| Bull :</label>
                                                <input
                                                  type="text"
                                                  value={animals[step].lastMate}
                                                  onChange={(e) => handleCowChange(animals[step].id, "lastMate", e.target.value )}
                                                  className="border border-green-300 px-1 py-1 rounded-lg "
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-500">Number of Calf(young ones) It has:</label>
                                                <input
                                                  type="number"
                                                  value={animals[step].Calf}
                                                  onChange={(e) => handleCowChange(animals[step].id, "Calf", parseInt(e.target.value) || 0)}
                                                  className="border border-green-300 px-1 py-1 rounded-lg "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                
                                )}
                                <div className="flex justify-between mt-6">
                                   <button
                                      type="button"
                                      onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                                      disabled={step === 0}
                                      className={`px-4 py-2 rounded-lg ${
                                          step === 0
                                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                          : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    { step === animals.length -1 ? (
                                        <button  
                                          type="submit"
                                          disabled={loading}
                                          className={`px-4 py-2 rounded-lg ${
                                            loading
                                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                              : "bg-green-500 text-white hover:bg-green-600"
                                          }`}
                                        >
                                            { loading ? "saving ..." : "save cow"}
                                        </button>
                                    ) : (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setStep((prev) => Math.min(prev + 1, animals.length - 1))
                                           }
                                           className="px-4 py-2 rounded-lg bg-green-800 text-white hover:bg-green-900"
                                        >
                                            Next
                                        </button>
                                    )}
                                    
                                </div>
                                </form>
                            </div>
                        )}

                        {/*Goat management data entry*/}

                        {farmingType === 'goats' && animals.length > 0 &&(
                            <div className="bg-green-100 shadow-sm rounded-2xl p-2 border border-gray-200">
                                <div className="flex items-center justify-center mb-6 space-x-2">
                                    {animals.map((_, i) => (
                                        <div
                                           key={i}
                                           className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                               i === step ? "bg-green-600 w-6" : "bg-gray-300"
                                           }`}
                                        />
                                    ))}
                                </div>
                                <h3 className="text-green-600 text-lg font-bold mb-4 text-center">
                                    Goats Details <span className="text-gray-500">(Goat {step + 1} of {animals.length})</span>
                                </h3>
                                {animals[step] && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="">
                                                <label className="block font-medium text-gray-500 mb-1">Name of Goat: </label>
                                                <input
                                                  type="text"
                                                  value={animals[step].name}
                                                  onChange={(e) => handleCowChange(animals[step].id, "name",  e.target.value)}
                                                  className="border px-1 py-1 border-green-300 rounded-lg "
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-500">Age of The Goat:</label>
                                                <input
                                                  type="number"
                                                  value={animals[step].age}
                                                  onChange={(e) => handleCowChange(animals[step].id, "age", parseInt(e.target.value) || 0)}
                                                  className="border border-green-300 px-1 py-1 rounded-lg "
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-500">LastBirth of the Goat:</label>
                                                <input
                                                  type="text"
                                                  value={animals[step].lastBirth}
                                                  onChange={(e) => handleCowChange(animals[step].id, "lastBirth", e.target.value)}
                                                  className="border border-green-300 px-1 py-1 rounded-lg "
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div >
                                                <label className="block font-medium text-gray-500">Last Mate Docter|| Bull :</label>
                                                <input
                                                  type="text"
                                                  value={animals[step].lastMate}
                                                  onChange={(e) => handleCowChange(animals[step].id, "lastMate", e.target.value )}
                                                  className="border border-green-300 px-1 py-1 rounded-lg "
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium text-gray-500">Number of Calf(young ones):</label>
                                                <input
                                                  type="number"
                                                  value={animals[step].Calf}
                                                  onChange={(e) => handleCowChange(animals[step].id, "Calf", parseInt(e.target.value) || 0)}
                                                  className="border border-green-300 px-1 py-1 rounded-lg "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between mt-6">
                                   <button
                                      onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                                      disabled={step === 0}
                                      className={`px-4 py-2 rounded-lg ${
                                          step === 0
                                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                          : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                       onClick={() =>
                                          setStep((prev) => Math.min(prev + 1, animals.length - 1))
                                        }
                                       disabled={step === animals.length - 1}
                                       className={`px-4 py-2 rounded-lg ${
                                           step === animals.length - 1
                                           ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                           : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
            </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">
                    {/* Container 3: Preview */}
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <h3 className="text-green-600 text-lg font-bold mb-4">Preview</h3>
                        {animals.length === 0 ? (
                            <p className="text-gray-500">No animals added yet.</p>
                        ) : (
                            <ul className="space-y-2">
                                {animals.map((cow) => (
                                    <li
                                      key={cow.id}
                                      className="p-3 border rounded-lg bg-gray-50 flex justify-between"
                                    >
                                        <span>
                                            <strong>{cow.name || `Cow #${cow.id}`}</strong> (Age:{" "}
                                            {cow.age})
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            Calves: {cow.Calf}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
        </div>
    )
}