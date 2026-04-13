'use client';

import { useState } from 'react';
import { AlertOctagon, TrendingDown } from 'lucide-react';
import { archiveAnimal } from '../actions/livestock';

export default function ArchiveAnimalCard({ animalTag }: { animalTag: string }) {
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleArchive = async () => {
    if (!reason) return alert('Please select a reason');
    setLoading(true);
    const result = await archiveAnimal({ tag: animalTag, reason, notes });
    if (result.success) {
      window.location.href = '/dashboard/animals';
    }
    setLoading(false);
  };

  return (
    <div className="bg-red-50 border border-red-100 p-4 rounded-xl shadow-sm max-w-4xl">
      {/* Compact Header */}
      <div className="flex items-center gap-2 mb-3">
        <AlertOctagon className="text-red-600" size={18} />
        <h3 className="font-bold text-red-600 text-sm">Archive / Remove Livestock</h3>
        <span className="text-[10px] text-gray-800 font-bold bg-red-100 px-2 py-0.5 rounded-full">Tag: {animalTag}</span>
      </div>

      {/* Row Layout for Inputs & Button */}
      <div className="flex flex-col md:flex-row items-end gap-3">
        
        {/* Reason Selection */}
        <div className="w-90 md:flex-1">
          <label className="text-[10px] font-black uppercase text-gray-400 block mb-1 ml-1">Reason</label>
          <select 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-90 border border-red-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Select Reason</option>
            <option value="sold">Sold</option>
            <option value="died">Died</option>
            <option value="removed">Removed</option>
          </select>
        </div>

        {/* Notes Input */}
        <div className="w-90 md:flex-1">
          <label className="text-[10px] font-black uppercase text-gray-400 block mb-1 ml-1">Additional Notes</label>
          <input 
            type="text"
            placeholder="e.g. Sold to local market"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-90 border border-red-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-red-400 bg-white"
          />
        </div>

        {/* Submit Button - Adjusted Width */}
        <button 
          onClick={handleArchive}
          className="w-full md:w-auto bg-red-600 text-white font-bold text-sm rounded-lg px-10 py-2 hover:bg-red-700 transition-colors  whitespace-nowrap"
          disabled={!reason || loading}
        >
          {loading ? 'Processing...' : 'Confirm'}
        </button>
      </div>

      {/* Ultra-compact Note */}
      <div className="mt-3 flex items-center gap-2 text-amber-700 opacity-80">
        <TrendingDown size={14} />
        <p className="text-[10px] font-medium">
          Keeps animal in reports & history, but removes from active herd dashboard.
        </p>
      </div>
    </div>
  );
}