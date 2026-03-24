"use client"

import { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosInstance";

interface Animal {
  tag: string;
  name: string;
  category: string;
  breed: string;
  age: number;
  healthStatus: string;
  heatStatus: string;
  pregnant: string;
  lastInsemination: string;
}

export default function AnimalsList() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await axiosInstance.get("/livestock/animals-listing", { withCredentials: true });
        setAnimals(res.data.listing);
      } catch (err) {
        console.error("Error fetching animals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  // Filter animals by search input
  const filteredAnimals = animals.filter(
    a =>
      a.tag.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading animals...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-green-700 text-center">Animals Listing</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by tag, name or category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnimals.map(animal => (
          <div
            key={animal.tag}
            className="bg-green-50 p-4 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition"
            onClick={() => setSelectedAnimal(animal)}
          >
            <h3 className="text-lg font-bold text-green-700">{animal.name || animal.tag}</h3>
            <p className="text-gray-700"><strong>Tag:</strong> {animal.tag}</p>
            <p className="text-gray-700"><strong>Category:</strong> {animal.category}</p>
            <p className="text-gray-700"><strong>Breed:</strong> {animal.breed}</p>
            <p className="text-gray-700"><strong>Age:</strong> {animal.age} months</p>
            <p className="text-gray-700"><strong>Health:</strong> {animal.healthStatus || "Unknown"}</p>
          </div>
        ))}
      </div>

      {/* Selected Animal Modal / Drawer */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setSelectedAnimal(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-green-700 mb-4">{selectedAnimal.name || selectedAnimal.tag}</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Tag:</strong> {selectedAnimal.tag}</li>
              <li><strong>Category:</strong> {selectedAnimal.category}</li>
              <li><strong>Breed:</strong> {selectedAnimal.breed}</li>
              <li><strong>Age:</strong> {selectedAnimal.age} months</li>
              <li><strong>Health Status:</strong> {selectedAnimal.healthStatus}</li>
              <li><strong>Heat Status:</strong> {selectedAnimal.heatStatus}</li>
              <li><strong>Pregnant:</strong> {selectedAnimal.pregnant}</li>
              <li><strong>Last Insemination:</strong> {selectedAnimal.lastInsemination || "N/A"}</li>
            </ul>
            <button
              onClick={() => alert("Edit feature coming soon")}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Edit Animal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}