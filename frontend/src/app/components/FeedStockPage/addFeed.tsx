'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

import { Banknote, Hash, Package, Ruler, Save, Tag, User } from 'lucide-react';

import axiosInstance from '../../API/axiosInstance';
import { Feed } from '../../types/feed';

type Props = {
  onAdd: (feed: Omit<Feed, 'id'>) => void;
};

type FormState = {
  name: string;
  category: string;
  quantity: string;
  unit: string;
  costPerUnit: string;
  supplier: string;
};

export default function AddFeedForm({ onAdd }: Props) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    category: '',
    quantity: '',
    unit: 'kg',
    costPerUnit: '',
    supplier: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        '/nutrition/feeds-register',
        formData
      );

      setMessage(res.data.message || 'Feed added successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to add feed', err);
      setMessage('Failed to add feed. Please try again.');
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }

    const quantity = Number(formData.quantity);
    const costPerUnit = Number(formData.costPerUnit);

    if (!formData.name || quantity <= 0) return;

    onAdd({
      name: formData.name,
      category: formData.category,
      quantity,
      unit: formData.unit,
      costPerUnit,
      supplier: formData.supplier,
    });

    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: 'kg',
      costPerUnit: '',
      supplier: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-green-200 to-emerald-100 p-2 rounded-3xl shadow-sm border border-green-200 space-y-4"
    >
      {/* Header Section */}
      <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
        <div className="p-2 bg-green-50 text-green-600 rounded-xl">
          <Package size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Add Stock Feed</h2>
          <p className="text-xs text-gray-400">Inventory Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feed Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">
            Feed Name:
          </label>
          <div className="relative">
            <Tag
              className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"
              size={16}
            />
            <input
              name="name"
              placeholder="e.g. Dairy Meal"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-200 text-gray-700 border-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Category Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">
            Category:
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 border-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium appearance-none"
          >
            <option value="">Select Category</option>
            <option value="Roughage">Roughage (Hay, Silage)</option>
            <option value="Concentrate">Concentrate</option>
            <option value="Supplement">Supplement</option>
          </select>
        </div>

        {/* Supplier */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">
            Supplier
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"
              size={16}
            />
            <input
              name="supplier"
              placeholder="Company Name"
              value={formData.supplier}
              onChange={handleChange}
              className="w-full text-gray-700 pl-10 pr-4 py-3 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Quantity Group */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">
            Quantity
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Hash
                className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"
                size={16}
              />
              <input
                name="quantity"
                type="number"
                placeholder="0.00"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 text-gray-700 border-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
              />
            </div>
            <div className="relative w-1/3">
              <Ruler
                className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"
                size={16}
              />
              <input
                name="unit"
                placeholder="kg"
                value={formData.unit}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 text-gray-700 border-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all text-sm font-bold text-center"
              />
            </div>
          </div>
        </div>

        {/* Cost Per Unit */}
        <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">
            Cost Per Unit (KES)
          </label>
          <div className="relative">
            <Banknote
              className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"
              size={16}
            />
            <input
              name="costPerUnit"
              type="number"
              placeholder="0.00"
              value={formData.costPerUnit}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 text-gray-700 border-none rounded-2xl focus:ring-2 focus:ring-green-500 transition-all text-sm font-medium"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <p className="text-xs text-gray-400 italic font-medium">
          Total Cost:{' '}
          <span className="text-green-600 font-bold">
            KES{' '}
            {(
              Number(formData.quantity) * Number(formData.costPerUnit) || 0
            ).toLocaleString()}
          </span>
        </p>
        <button
          className={`w-3xs flex justify-center items-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-300 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving ...
            </>
          ) : (
            <>
              <Save size={18} />
              Confirm Entry
            </>
          )}
        </button>
      </div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </form>
  );
}
