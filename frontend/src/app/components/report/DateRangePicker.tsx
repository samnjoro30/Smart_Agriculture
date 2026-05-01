import React from 'react';
import { Calendar, Filter, ArrowRight, Loader2 } from 'lucide-react';

interface DateRangeProps {
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
  onApply: () => void;
  isLoading?: boolean;
}

const DateRangePicker: React.FC<DateRangeProps> = ({ 
  startDate, 
  endDate, 
  onDateChange, 
  onApply,
  isLoading 
}) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-10 py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-50/50 p-2 rounded-2xl border border-gray-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
          
          {/* Date Inputs Group */}
          <div className="flex-1 grid grid-cols-2 md:flex md:items-center gap-2">
            
            {/* Start Date */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Calendar size={16} />
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => onDateChange(e.target.value, endDate)}
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-all focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none hover:border-gray-300"
              />
              <label className="absolute -top-2 left-3 px-1 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                From
              </label>
            </div>

            {/* Separator - Hidden on small mobile */}
            <div className="hidden md:flex items-center text-gray-300">
              <ArrowRight size={16} />
            </div>

            {/* End Date */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Calendar size={16} />
              </span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => onDateChange(startDate, e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-all focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none hover:border-gray-300"
              />
              <label className="absolute -top-2 left-3 px-1 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                To
              </label>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onApply}
            disabled={isLoading}
            className="relative group overflow-hidden bg-green-600 disabled:bg-gray-400 text-white px-8 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300 disabled:shadow-none"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Filter size={16} className="group-hover:rotate-12 transition-transform" />
                <span>Update Dashboard</span>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;