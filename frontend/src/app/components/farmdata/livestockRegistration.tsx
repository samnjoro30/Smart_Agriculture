"use client"

import { useState } from "react"
import { 
  Save, 
  PawPrint, 
  Heart, 
  Calendar, 
  Ruler, 
  Weight,
  Tag,
  User,
  Droplet,
  Baby
} from "lucide-react"
import axiosInstance from '../../API/axiosInstance';

export default function RegisterAnimal() {
  const [formData, setFormData] = useState({
    tag: "",
    name: '',
    category: "cow",
    breed: "",
    age: "",
    weight: "",
    sex: "female",
    heatStatus: "no",
    pregnant: "no",
    lastInsemination: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    try{
        const res = await axiosInstance.post("/livestock/register", formData);
        setMessage(res.data.message)
        setFormData({
            tag: "",
            name: '',
            category: "cow",
            breed: "",
            age: "",
            weight: "",
            sex: "female",
            heatStatus: "no",
            pregnant: "no",
            lastInsemination: ""
          })
    }catch(err:any){
        if (err.response) {
            setError(err.response.data?.message || "Something went wrong")
        } else if (err.request) {
            setError("Network error. Check your connection.")
        } else {
            setError("Unexpected error occurred")
        }
    }finally{
        setLoading(false)
    }
    
  }

  // Reusable Input Component
  function Input({ 
    label, 
    name, 
    value, 
    onChange, 
    type = "text",
    icon: Icon,
    required = false,
    placeholder = ""
  }: any) {
    return (
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-green-500" />
            </div>
          )}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
              transition-all duration-200 ${Icon ? 'pl-10' : ''}`}
          />
        </div>
      </div>
    )
  }

  // Reusable Select Component
  function Select({ 
    label, 
    name, 
    value, 
    onChange, 
    options,
    icon: Icon,
    required = false
  }: any) {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-green-500" />
            </div>
          )}
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full border border-green-300 rounded-lg px-3 py-2.5 text-gray-700 
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
              appearance-none cursor-pointer transition-all duration-200 ${Icon ? 'pl-10' : ''}`}
          >
            {options.map((opt: string, i: number) => (
              <option key={i} value={opt.toLowerCase()}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  // Section Header Component
  function SectionHeader({ title, icon: Icon, color = "green" }: any) {
    return (
      <div className="flex items-center space-x-3 mb-5 pb-2 border-b-2 border-green-200">
        <div className={`p-2 bg-${color}-100 rounded-lg`}>
          <Icon className={`h-5 w-5 text-${color}-600`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-4 px-2">
        {message && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                {message}
            </div>
        )}

        {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg">
                {error}
            </div>
        )}
        <form 
           onSubmit={handleSubmit}
           className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-white mb-2">
                Register Animal
              </h1>
              <p className="text-green-100 text-sm">
                Add a new animal to your farm inventory
              </p>
            </div>
            <div className="bg-white/20 p-1 rounded-full">
              <PawPrint className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* BASIC INFORMATION */}
          <div className="bg-gray-50 rounded-xl p-5 transition-all hover:shadow-md">
            <SectionHeader title="Basic Information" icon={User} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input 
                label="Tag ID" 
                name="tag" 
                value={formData.tag} 
                onChange={handleChange}
                icon={Tag}
                required
                placeholder="e.g., COW-001"
              />
              <Input 
                label="Name (Optional)" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                icon={User}
                placeholder="Give your animal a name"
              />
              <Select 
                label="Category" 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                options={["Cow", "Calf"]}
                icon={Baby}
                required
              />
              <Input 
                label="Breed" 
                name="breed" 
                value={formData.breed} 
                onChange={handleChange}
                placeholder="e.g., Holstein, Jersey"
                required
              />
              <Input 
                label="Age (months)" 
                name="age" 
                type="number" 
                value={formData.age} 
                onChange={handleChange}
                icon={Calendar}
                placeholder="Age in months"
              />
            </div>
          </div>

          {/* REPRODUCTION INFORMATION */}
          <div className="bg-gray-50 rounded-xl p-5 transition-all hover:shadow-md">
            <SectionHeader title="Reproduction Information" icon={Heart} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Select 
                label="Sex" 
                name="sex" 
                value={formData.sex} 
                onChange={handleChange}
                options={["Female", "Male"]}
                icon={User}
                required
              />
              <Select 
                label="Heat Status" 
                name="heatStatus" 
                value={formData.heatStatus} 
                onChange={handleChange}
                options={["No", "In Heat"]}
                icon={Droplet}
              />
              <Select 
                label="Pregnant" 
                name="pregnant" 
                value={formData.pregnant} 
                onChange={handleChange}
                options={["No", "Yes"]}
                icon={Baby}
              />
              <Input 
                label="Last Insemination Date" 
                name="lastInsemination" 
                type="date" 
                value={formData.lastInsemination} 
                onChange={handleChange}
                icon={Calendar}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-xl 
              text-lg font-semibold hover:from-green-700 hover:to-emerald-700 
              transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              flex items-center justify-center space-x-2 shadow-lg"
          >
            <Save className="h-5 w-5" />
            <span>{loading ? "Registering..." : "Register Animal"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}