"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Save } from "lucide-react"
import { Feed } from "../../types/feed"

type Props = {
  onAdd: (feed: Omit<Feed, "id">) => void
}

type FormState = {
  name: string
  category: string
  quantity: string
  unit: string
  costPerUnit: string
  supplier: string
}

export default function AddFeedForm({ onAdd }: Props) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    category: "",
    quantity: "",
    unit: "kg",
    costPerUnit: "",
    supplier: ""
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const quantity = Number(formData.quantity)
    const costPerUnit = Number(formData.costPerUnit)

    if (!formData.name || quantity <= 0) return

    onAdd({
      name: formData.name,
      category: formData.category,
      quantity,
      unit: formData.unit,
      costPerUnit,
      supplier: formData.supplier
    })

    setFormData({
      name: "",
      category: "",
      quantity: "",
      unit: "kg",
      costPerUnit: "",
      supplier: ""
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Feed</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          name="name"
          placeholder="Feed name"
          value={formData.name}
          onChange={handleChange}
          className="input"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input"
        >
          <option value="">Category</option>
          <option value="Roughage">Roughage</option>
          <option value="Concentrate">Concentrate</option>
          <option value="Supplement">Supplement</option>
        </select>

        <input
          name="supplier"
          placeholder="Supplier"
          value={formData.supplier}
          onChange={handleChange}
          className="input"
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="input"
        />

        <input
          name="unit"
          placeholder="Unit (kg, bags)"
          value={formData.unit}
          onChange={handleChange}
          className="input"
        />

        <input
          name="costPerUnit"
          type="number"
          placeholder="Cost per unit"
          value={formData.costPerUnit}
          onChange={handleChange}
          className="input"
        />
      </div>

      <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">
        <Save size={18} />
        Save Feed
      </button>
    </form>
  )
}