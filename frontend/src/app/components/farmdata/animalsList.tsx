"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [healthFilter, setHealthFilter] = useState("all");

  const router = useRouter();

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

  // 🔍 Filtering logic
  const filteredAnimals = animals.filter(a => {
    const matchesSearch =
      a.tag.toLowerCase().includes(search.toLowerCase()) ||
      (a.name || "").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || a.category === categoryFilter;

    const matchesHealth =
      healthFilter === "all" || a.healthStatus === healthFilter;

    return matchesSearch && matchesCategory && matchesHealth;
  });

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading animals...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold text-green-700">
          Livestock
        </h2>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">

          {/* Search */}
          <input
            type="text"
            placeholder="Search animals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border text-gray-700 rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-green-400"
          />

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border-green-400 text-gray-700 rounded-lg px-3 py-2"
          >
            <option value="all">All Categories</option>
            <option value="cow">Cows</option>
            <option value="bull">Bulls</option>
            <option value="calf">Calves</option>
          </select>

          {/* Health Filter */}
          <select
            value={healthFilter}
            onChange={(e) => setHealthFilter(e.target.value)}
            className="border-gray-700 text-gray-700 rounded-lg px-3 py-2"
          >
            <option value="all">All Health</option>
            <option value="healthy">Healthy</option>
            <option value="sick">Sick</option>
          </select>

        </div>
      </div>


      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {filteredAnimals.map((animal) => (
          <div
            key={animal.tag}
            onClick={() => router.push(`/livestock/${animal.tag}`)}
            className="bg-green-200 border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-green-700">
                {animal.name || animal.tag}
              </h3>

              <StatusBadge status={animal.healthStatus} />
            </div>

            {/* Details */}
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Tag:</strong> {animal.tag}</p>
              <p><strong>Breed:</strong> {animal.breed}</p>
              <p><strong>Category:</strong> {animal.category}</p>
              <p><strong>Age:</strong> {animal.age} months</p>
            </div>

            {/* Footer */}
            <div className="mt-3 flex justify-between text-xs text-gray-500">
              <span>Heat: {animal.heatStatus}</span>
              <span>Pregnant: {animal.pregnant}</span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}


/* 🔁 Status Badge */
function StatusBadge({ status }: { status: string }) {
  const color =
    status === "healthy"
      ? "bg-green-100 text-green-700"
      : status === "sick"
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-600";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status || "Unknown"}
    </span>
  );
}