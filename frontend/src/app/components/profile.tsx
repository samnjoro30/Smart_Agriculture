"use client"
import { useState, useEffect } from "react"
import axiosInstance from "../API/axiosInstance"

interface Profile {
  email: string
  farmname: string
  phonenumber: string
}

export default function ProfileSetting() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    email: "",
    farmname: "",
    phonenumber: "",
    password: "",
  })

  const [editingField, setEditingField] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/users/userprofile", {
          withCredentials: true,
        })
        const details = res.data.message
        setProfile(details)
        setFormData({
          email: details.email,
          farmname: details.farmname,
          phonenumber: details.phonenumber,
          password: "",
        })
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        console.error("Error fetching details", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async (field: string) => {
    try {
      await axiosInstance.put(`/users/update-${field}`, {
        [field]: formData[field as keyof typeof formData],
      })
      setEditingField(null)
      alert(`${field} updated successfully!`)
    } catch (error) {
      console.error(`Error updating ${field}`, error)
    }
  }

  if (loading) return <p className="text-center">Loading profile...</p>

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Profile Settings
      </h2>

      <div className="space-y-6">
        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Email</label>
          {editingField === "email" ? (
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                onClick={() => handleSave("email")}
                className="bg-green-600 text-white px-3 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="bg-gray-300 px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{profile?.email}</span>
              <button
                onClick={() => setEditingField("email")}
                className="text-green-600 font-medium"
              >
                Change
              </button>
            </div>
          )}
        </div>

        {/* Farm Name */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Farm Name</label>
          {editingField === "farmname" ? (
            <div className="flex gap-2">
              <input
                type="text"
                name="farmname"
                value={formData.farmname}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                onClick={() => handleSave("farmname")}
                className="bg-green-600 text-white px-3 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="bg-gray-300 px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{profile?.farmname}</span>
              <button
                onClick={() => setEditingField("farmname")}
                className="text-green-600 font-medium"
              >
                Change
              </button>
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Phone</label>
          {editingField === "phonenumber" ? (
            <div className="flex gap-2">
              <input
                type="text"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                onClick={() => handleSave("phonenumber")}
                className="bg-green-600 text-white px-3 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="bg-gray-300 px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{profile?.phonenumber}</span>
              <button
                onClick={() => setEditingField("phonenumber")}
                className="text-green-600 font-medium"
              >
                Change
              </button>
            </div>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Password</label>
          {editingField === "password" ? (
            <div className="flex gap-2">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button
                onClick={() => handleSave("password")}
                className="bg-green-600 text-white px-3 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="bg-gray-300 px-3 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-gray-500">••••••••</span>
              <button
                onClick={() => setEditingField("password")}
                className="text-green-600 font-medium"
              >
                Change
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
