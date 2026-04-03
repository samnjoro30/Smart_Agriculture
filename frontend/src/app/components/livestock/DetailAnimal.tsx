"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axiosInstance from "../../API/axiosInstance"
import { ArrowLeft, Edit3, PlusCircle, Dna, Activity, Baby, Calendar, Heart, User, Users } from "lucide-react";

interface Animal {
  tag: string
  name: string
  category: string
  breed: string
  age: number
  healthStatus: string
  heatStatus: string
  pregnant: string
  lastInsemination: string

  // lineage
  motherTag?: string
  fatherTag?: string
  inseminationType?: string
  birthDate?: string
}
interface Props {
    id: string;
    onBack: () => void;
  }

export default function AnimalDetails({ id, onBack }: Props) {
  //const { id } = useParams()
  const router = useRouter()

  const [animal, setAnimal] = useState<Animal | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await axiosInstance.get(`/livestock/animal/${id}`)
        setAnimal(res.data.animal)
      } catch (err) {
        console.error("Error fetching animal:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchAnimal()
  }, [id])

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div></div>;

  if (!animal) return <div className="text-center p-10 bg-red-50 text-red-600 rounded-xl">Animal data not found.</div>;
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
  
      {/* 🔝 HEADER */}
      <div className="bg-green-200 p-4 rounded-2xl shadow-md flex justify-between items-center">
  
        <div>
          <h2 className="text-2xl text-gray-800 font-bold">
            {animal.name || animal.tag}
          </h2>
          <p className="text-green-500 font-bold text-sm">Tag: {animal.tag}</p>
        </div>
  
        {/* STATUS BADGE */}
        <div className="text-right">
          <p className="text-sm text-gray-700 font-bold">Health</p>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold
            ${animal.healthStatus === "healthy" ? "bg-green-300 text-green-600" : "bg-red-100 text-red-600"}
          `}>
            {animal.healthStatus || "Unknown"}
          </span>
        </div>
  
      </div>
  
      {/* 🔹 QUICK ACTIONS */}
      <div className="flex gap-3 flex-wrap">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <PlusCircle size={18}/> Add Record
        </button>
  
        <button className="bg-green-600 px-4 py-2 rounded-lg flex items-center gap-2">
          <Edit3 size={18}/> Edit
        </button>
  
        <button
          onClick={onBack}
          className="text-green-700 font-semibold flex items-center gap-2"
        >
          <ArrowLeft size={18}/> Back
        </button>
      </div>
  
      {/* 🔹 MAIN INFO */}
      <div className="grid md:grid-cols-2 gap-4">
  
        {/* BASIC */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Activity size={18}/>
              </div>
              Basic Overview
            </h3>
            <span className="text-[10px] uppercase tracking-widest font-extrabold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
              {animal.category}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-50">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Breed</p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {animal.breed || "Crossbreed"}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-50">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Current Age</p>
              <p className="text-sm font-semibold text-gray-800">
                {animal.age} <span className="text-[10px] text-gray-500 font-normal">months</span>
              </p>
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
            <span className="text-xs text-gray-400">System ID</span>
            <span className="text-xs font-mono text-gray-800 uppercase">
              {animal.tag?.toString().slice(0, 8)}...
            </span>
          </div>

        </div>
  
        {/* REPRODUCTION */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <div className="p-1.5 bg-green-50 rounded-lg text-green-600">
              <Dna size={18}/>
            </div>
            {animal.category === "calf" ? "Birth Info" : "Reproduction"}
          </h3>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
            {animal.category === "cow" ? (
              <>
                <span className="text-gray-500 flex items-center">Heat Status</span>
                <span className="text-right">
                  <span className={`px-2 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider ${animal.heatStatus ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-gray-100 text-gray-500'}`}>
                    {animal.heatStatus ? "In Heat" : "Normal"}
                  </span>
                </span>

                <span className="text-gray-500 flex items-center">Pregnancy</span>
                  <span className="text-right">
                    <span className={`px-2 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider ${animal.pregnant ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-50 text-blue-600'}`}>
                      {animal.pregnant ? "Pregnant" : "Open"}
                    </span>
                  </span>

                <span className="text-gray-500 flex items-center">Last Insemination</span>
                <span className="text-right font-semibold text-gray-700">
                    {animal.lastInsemination ? new Date(animal.lastInsemination).toLocaleDateString() : "N/A"}
                </span>
              </>
              ) : (
                <>
                  <span className="text-gray-500">Mother</span>
                  <span className="text-right font-bold text-blue-600 bg-blue-50 rounded px-2 py-0.5">
                    {animal.motherTag || "N/A"}
                  </span>
                  <span className="text-gray-500">Father</span>
                  <span className="text-right font-bold text-gray-700 bg-gray-50 rounded px-2 py-0.5">
                    {animal.fatherTag || "N/A"}
                  </span>

                  <span className="text-gray-500">Birth Date</span>
                  <span className="text-right font-medium text-gray-700">
                    {animal.birthDate ? new Date(animal.birthDate).toLocaleDateString() : "N/A"}
                  </span>

                  <span className="text-gray-500">Insem. Type</span>
                  <span className="text-right text-xs font-semibold uppercase text-gray-500">
                    {animal.inseminationType || "Natural"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
  
      {/* 🔹 LINEAGE */}
      <div className="bg-green-50 p-5 rounded-xl shadow-sm">
        <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
          <Baby size={18}/> Lineage
        </h3>
  
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="text-gray-500 text-xs">Mother</p>
            <p className="font-medium">{animal.motherTag || "N/A"}</p>
          </div>
  
          <div>
            <p className="text-gray-500 text-xs">Father</p>
            <p className="font-medium">{animal.fatherTag || "N/A"}</p>
          </div>
        </div>
      </div>
  
      {/* 🔥 NEW: RELEASE LIVESTOCK */}
      <div className="bg-red-50 border border-red-200 p-5 rounded-xl shadow-sm">
        <h3 className="font-semibold text-red-600 mb-3">
          ⚠️ Release / Remove Livestock
        </h3>
  
        <p className="text-sm text-gray-600 mb-4">
          Use this when the animal is sold, has died, or removed from the farm.
        </p>
  
        <div className="grid md:grid-cols-3 gap-3">
  
          <select className="border rounded-lg px-3 py-2 text-gray-700">
            <option value="">Select Reason</option>
            <option value="sold">Sold</option>
            <option value="died">Died</option>
            <option value="removed">Removed</option>
          </select>
  
          <input
            type="text"
            placeholder="Additional notes..."
            className="border rounded-lg px-3 py-2"
          />
  
          <button className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700">
            Confirm
          </button>
  
        </div>
      </div>
  
    </div>
  )
}