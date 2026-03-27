"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axiosInstance from "../../API/axiosInstance"
import { ArrowLeft, Edit3, PlusCircle, Dna, Activity, Baby, Calendar } from "lucide-react";

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
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
            <Activity size={18}/> Basic Info
          </h3>
  
          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
            <span>Category</span><span>{animal.category}</span>
            <span>Breed</span><span>{animal.breed}</span>
            <span>Age</span><span>{animal.age} months</span>
          </div>
        </div>
  
        {/* REPRODUCTION */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
            <Dna size={18}/>
            {animal.category === "calf" ? "Birth Info" : "Reproduction"}
          </h3>
  
          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-700">
  
            {animal.category === "cow" ? (
              <>
                <span>Heat</span><span>{animal.heatStatus}</span>
                <span>Pregnant</span><span>{animal.pregnant}</span>
                <span>Last Insemination</span>
                <span>{animal.lastInsemination || "N/A"}</span>
              </>
            ) : (
              <>
                <span>Mother</span><span>{animal.motherTag || "N/A"}</span>
                <span>Father</span><span>{animal.fatherTag || "N/A"}</span>
                <span>Birth Date</span><span>{animal.birthDate || "N/A"}</span>
                <span>Type</span><span>{animal.inseminationType || "N/A"}</span>
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