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
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Livestock Inventory
          </h2>
          <p className="text-slate-600 text-sm mt-0.5">
            Select any animal row to view full medical and breeding records.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Search Input */}
          <div className="relative group flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-emerald-700" />
            <input
              type="text"
              placeholder="Search by tag # or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-md text-slate-900 shadow-sm focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none text-sm"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-slate-300 text-slate-800 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-emerald-700 outline-none cursor-pointer"
            >
              <option value="all">All Species</option>
              <option value="cow">Cows</option>
              <option value="bull">Bulls</option>
              <option value="calf">Calves</option>
            </select>

            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              className="bg-white border border-slate-300 text-slate-800 rounded-md px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-emerald-700 outline-none cursor-pointer"
            >
              <option value="all">Health: All</option>
              <option value="Good">Healthy</option>
              <option value="Sick">Medical Attention</option>
            </select>
          </div>
        </div>
      </div>

      {/* LIVESTOCK TABLE */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-800">
            <thead className="bg-slate-100 text-slate-700 font-semibold text-xs uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Tag # / Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Breed</th>
                <th className="py-3.5 px-4">Age</th>
                <th className="py-3.5 px-4">Health Status</th>
                <th className="py-3.5 px-4">Breeding State</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAnimals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    No animals matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredAnimals.map((animal) => (
                  <tr
                    key={animal.tag}
                    onClick={() => setSelectedAnimalId(animal.tag)}
                    className="hover:bg-emerald-50/60 transition-colors cursor-pointer group"
                  >
                    {/* Tag & Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                        {animal.name || 'Unnamed'}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        #{animal.tag}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 capitalize font-medium text-slate-700">
                      {animal.category}
                    </td>

                    {/* Breed */}
                    <td className="py-3.5 px-4 text-slate-700">
                      {animal.breed || '—'}
                    </td>

                    {/* Age */}
                    <td className="py-3.5 px-4 text-slate-700">
                      {animal.age} mos
                    </td>

                    {/* Health Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={animal.healthStatus} />
                    </td>

                    {/* Reproductive / Heat Status */}
                    <td className="py-3.5 px-4">
                      {animal.pregnant ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-md text-xs font-semibold">
                          <Baby className="h-3.5 w-3.5 text-emerald-700" />
                          Pregnant
                        </span>
                      ) : animal.heatStatus ? (
                        <span className="inline-flex items-center px-2.5 py-1 bg-amber-100 text-amber-900 rounded-md text-xs font-semibold">
                          In Heat
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs">Open</span>
                      )}
                    </td>

                    {/* Action Arrow */}
                    <td className="py-3.5 px-4 text-right">
                      <ChevronRight className="h-5 w-5 inline-block text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* 🔁 Farmer-Friendly Status Badge */
function StatusBadge({ status }: { status: string }) {
  const isHealthy = status?.toLowerCase() === 'healthy';
  const isSick = status?.toLowerCase() === 'sick';

  const badgeStyles = isHealthy
    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
    : isSick
      ? 'bg-red-100 text-red-800 border-red-300'
      : 'bg-slate-100 text-slate-700 border-slate-300';

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded border text-xs font-medium ${badgeStyles}`}
    >
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
    </span>
  );
}
