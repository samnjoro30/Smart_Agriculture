'use client';

import { useMemo, useState } from 'react';

import {
  Activity,
  ArrowRight,
  Banknote,
  Hash,
  Milk,
  Save,
  Search,
  User,
  Users,
} from 'lucide-react';

import axiosInstance from '../../API/axiosInstance';

// --- Sub-Components ---

const InputField = ({
  label,
  icon,
  value,
  onChange,
  abnormal,
  placeholder,
  unit,
}: any) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-[10px] font-bold text-emerald-700/60 uppercase ml-1 tracking-widest">
      {label}
    </label>
    <div className="relative group transition-all duration-200">
      <div
        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
          abnormal
            ? 'text-amber-500'
            : 'text-emerald-400 group-focus-within:text-emerald-600'
        }`}
      >
        {icon}
      </div>
      <input
        type="number"
        step="any"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-12 py-3.5 bg-white/60 text-gray-700 border-2 rounded-2xl outline-none transition-all text-sm font-semibold
          ${
            abnormal
              ? 'border-amber-200 bg-amber-50 text-amber-900 focus:border-amber-400'
              : 'border-transparent focus:border-emerald-500 focus:bg-white shadow-sm hover:border-emerald-100'
          }`}
      />
      {unit && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 uppercase">
          {unit}
        </span>
      )}
    </div>
  </div>
);

const CowSelector = ({
  search,
  setSearch,
  selectedCow,
  setSelectedCow,
}: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-emerald-700/60 uppercase ml-1 tracking-widest">
      Identify Animal
    </label>
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400"
        size={18}
      />
      <input
        placeholder="Enter Tag ID (e.g. 42)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={() =>
          setSelectedCow({
            id: '1',
            tag: search,
            name: `${search}`,
            avgDailyYield: 12,
          })
        }
        className="w-full pl-10 pr-4 py-3.5 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none shadow-sm text-sm font-medium transition-all"
      />
    </div>

    {selectedCow && (
      <div className="flex items-center justify-between p-3 bg-emerald-500/5 border border-emerald-100 rounded-2xl animate-in fade-in slide-in-from-top-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-bold text-emerald-900">
            {selectedCow.name}
          </span>
        </div>
        <button
          onClick={() => setSelectedCow(null)}
          type="button"
          className="text-[10px] font-bold text-emerald-600 hover:underline"
        >
          Change
        </button>
      </div>
    )}
  </div>
);

// --- Main Component ---

export default function MilkEntryForm() {
  const [mode, setMode] = useState<'individual' | 'bulk'>('individual');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCow, setSelectedCow] = useState<any>(null);
  const [liters, setLiters] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('50');
  const [message, setMessage] = useState('');
  const [sessionType, setSessionType] = useState('morning');

  const totals = useMemo(() => {
    const qty = parseFloat(liters) || 0;
    const p = parseFloat(pricePerLiter) || 0;
    return {
      revenue: qty * p,
    };
  }, [liters, pricePerLiter]);

  const isAbnormal = useMemo(() => {
    if (!selectedCow || !liters) return false;
    const l = parseFloat(liters);
    // Yields outside +/- 3L of average are flagged as abnormal
    return (
      l < selectedCow.avgDailyYield - 3 || l > selectedCow.avgDailyYield + 3
    );
  }, [liters, selectedCow]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'individual' && !selectedCow) {
        setMessage('Please select a valid cow');
        return;
      }
      const payload = {
        cowTag: mode === 'individual' ? selectedCow?.tag || search : null,
        liters: parseFloat(liters),
        pricePerLiter: parseFloat(pricePerLiter),
        //totalRevenue: totals.revenue,
        session: mode === 'individual' ? 'single' : sessionType,
      };

      const res = await axiosInstance.post(
        '/reproduction/milk-production',
        payload
      );
      setMessage(res.data.message || 'Milk record saved successfully!');

      setLiters('');
      setSelectedCow(null);
      setSearch('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error saving milk record:', err);
      setMessage('Failed to save milk record. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-100/50 via-emerald-50 to-white p-6 rounded-[2.5rem] border border-emerald-100 shadow-xl shadow-emerald-900/5 space-y-6">
      {/* Header with Mode Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200">
            <Milk size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-lg font-black text-gray-800 leading-tight">
              Milk Record
            </h2>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
              Production Ledger
            </p>
          </div>
        </div>

        <div className="flex bg-emerald-200/50 p-1.5 rounded-2xl border border-emerald-200/20">
          <button
            type="button"
            onClick={() => setMode('individual')}
            className={`p-2 rounded-xl transition-all ${mode === 'individual' ? 'bg-white text-emerald-600 shadow-md scale-105' : 'text-emerald-500/60 hover:text-emerald-600'}`}
          >
            <User size={18} />
          </button>
          <button
            type="button"
            onClick={() => setMode('bulk')}
            className={`p-2 rounded-xl transition-all ${mode === 'bulk' ? 'bg-white text-emerald-600 shadow-md scale-105' : 'text-emerald-500/60 hover:text-emerald-600'}`}
          >
            <Users size={18} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {mode === 'individual' ? (
          <CowSelector
            search={search}
            setSearch={setSearch}
            selectedCow={selectedCow}
            setSelectedCow={setSelectedCow}
          />
        ) : (
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-emerald-700/60 uppercase ml-1 tracking-widest">
              Milking Session
            </label>
            <div className="relative">
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full p-3.5 bg-white border-2 border-transparent rounded-2xl shadow-sm outline-none focus:border-emerald-500 font-bold text-sm text-gray-700 appearance-none"
              >
                <option value="morning">Morning Session</option>
                <option value="evening">Evening Session</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                <Users size={16} />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Numerical Inputs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <InputField
            label="Liters Produced"
            icon={<Hash size={18} />}
            value={liters}
            onChange={setLiters}
            abnormal={isAbnormal}
            placeholder="0.00"
            unit="Ltrs"
          />
          <InputField
            label="Rate per Litre"
            icon={<Banknote size={18} />}
            value={pricePerLiter}
            onChange={setPricePerLiter}
            unit="KES"
          />
        </div>

        {/* Yield Context - Visual feedback for individual mode */}
        {mode === 'individual' && selectedCow && (
          <div className="flex justify-between px-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              Avg Yield: {selectedCow.avgDailyYield}L
            </span>
            {isAbnormal && (
              <span className="text-[10px] font-bold text-amber-500 animate-pulse tracking-wide">
                ⚠️ OUTSIDE NORMAL RANGE
              </span>
            )}
          </div>
        )}

        {/* Financial Summary Card */}
        <div className="bg-white/40 backdrop-blur-sm border-2 border-white rounded-[2rem] p-5 shadow-inner">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Calculated Revenue
              </p>
              <h3 className="text-2xl font-black text-emerald-600">
                KES {totals.revenue.toLocaleString()}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Total Qty
              </p>
              <h3 className="text-2xl font-black text-gray-800">
                {liters || '0'}
                <span className="text-sm ml-1 text-gray-400">L</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            loading || (mode === 'individual' && !selectedCow) || !liters
          }
          className={`w-full py-2 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg
            ${loading ? 'bg-green-500 text-gray-400' : 'bg-green-500 text-white'}
          `}
        >
          {loading ? (
            <Activity className="animate-spin" size={20} />
          ) : (
            <>
              Confirm
              <ArrowRight size={18} />
            </>
          )}
        </button>
        {message && (
          <p className="text-sm font-bold text-green-500 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
