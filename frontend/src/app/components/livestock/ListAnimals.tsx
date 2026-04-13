'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Activity,
  Baby,
  Calendar,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react';

import axiosInstance from '../../API/axiosInstance';
import AnimalDetails from './DetailAnimal';

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

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [healthFilter, setHealthFilter] = useState('all');
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await axiosInstance.get('/livestock/animals-listing', {
          withCredentials: true,
        });
        setAnimals(res.data?.listing);
      } catch (err) {
        console.error('Error fetching animals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  if (selectedAnimalId) {
    return (
      <AnimalDetails
        id={selectedAnimalId}
        onBack={() => setSelectedAnimalId(null)}
      />
    );
  }
  // 🔍 Filtering logic
  const filteredAnimals = animals.filter((a) => {
    const matchesSearch =
      a.tag.toLowerCase().includes(search.toLowerCase()) ||
      (a.name || '').toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || a.category === categoryFilter;

    const matchesHealth =
      healthFilter === 'all' || a.healthStatus === healthFilter;

    return matchesSearch && matchesCategory && matchesHealth;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Livestock Inventory
          </h2>
          <p className="text-gray-500 mt-1">
            Manage and monitor your herd's health and productivity.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Search Input */}
          <div className="relative group flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-600" />
            <input
              type="text"
              placeholder="Search by name or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-green-500 outline-none cursor-pointer hover:bg-gray-50"
            >
              <option value="all">All Species</option>
              <option value="cow">Cows</option>
              <option value="bull">Bulls</option>
              <option value="calf">Calves</option>
            </select>

            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
            >
              <option value="all">Health: All</option>
              <option value="healthy">Good Status</option>
              <option value="sick">Medical Attention</option>
            </select>
          </div>
        </div>
      </div>

      {/* LIVESTOCK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <div
            key={animal.tag}
            onClick={() => setSelectedAnimalId(animal.tag)}
            className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Category Accent Bar */}
            <div
              className={`absolute top-0 left-0 w-full h-1.5 ${
                animal.category === 'bull'
                  ? 'bg-blue-500'
                  : animal.category === 'calf'
                    ? 'bg-amber-400'
                    : 'bg-green-500'
              }`}
            />

            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  #{animal.tag}
                </span>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                  {animal.name || 'Unnamed Animal'}
                </h3>
              </div>
              <StatusBadge status={animal.healthStatus} />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    Breed
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {animal.breed}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">
                    Age
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {animal.age} Months
                  </p>
                </div>
              </div>
            </div>

            {/* Reproductive Status Footer */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {animal.pregnant ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold ring-1 ring-green-200">
                    <Baby className="h-3 w-3" />
                    Pregnant
                  </div>
                ) : (
                  <div className="flex gap-3 text-xs font-medium text-gray-500">
                    <span
                      className={
                        animal.heatStatus ? 'text-orange-600 font-bold' : ''
                      }
                    >
                      Heat: {animal.heatStatus ? 'In Heat' : 'No'}
                    </span>
                    <span>•</span>
                    <span>Open</span>
                  </div>
                )}
              </div>

              <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
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
    status === 'healthy'
      ? 'bg-green-100 text-green-700'
      : status === 'sick'
        ? 'bg-red-100 text-red-700'
        : 'bg-gray-100 text-gray-600';

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status || 'Unknown'}
    </span>
  );
}
