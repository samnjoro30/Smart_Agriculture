import React from 'react';

import {
  Activity,
  ChevronRight,
  Loader2,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface UserPlanStatusProps {
  currentPlan?: string;
  animalCount?: number;
  maxAnimals?: number;
  loading?: boolean;
}

const UserPlanStatus: React.FC<UserPlanStatusProps> = ({
  currentPlan = 'Basic',
  animalCount = 0,
  maxAnimals = 3,
  loading = false,
}) => {
  const usagePercentage = Math.min((animalCount / maxAnimals) * 100, 100);

  const getStatusTheme = () => {
    if (usagePercentage >= 90)
      return { color: 'text-red-600', bg: 'bg-red-500', lightBg: 'bg-red-50' };
    if (usagePercentage >= 75)
      return {
        color: 'text-amber-600',
        bg: 'bg-amber-500',
        lightBg: 'bg-amber-50',
      };
    return {
      color: 'text-green-600',
      bg: 'bg-green-500',
      lightBg: 'bg-green-50',
    };
  };

  const theme = getStatusTheme();

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-green-600" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 h-full flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-2xl ${theme.lightBg} ${theme.color}`}>
            <Activity size={24} />
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
              Live Status
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full border border-green-100">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-green-700 uppercase">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Plan Info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              {currentPlan}
            </h3>
            {currentPlan !== 'Basic' && (
              <ShieldCheck size={20} className="text-blue-500" />
            )}
          </div>
          <p className="text-sm font-medium text-gray-500">
            {currentPlan === 'Basic'
              ? 'Free tier for small setups'
              : 'Premium farm management'}
          </p>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">
              Herd Capacity
            </span>
            <span className="text-sm font-black text-gray-900">
              {animalCount}{' '}
              <span className="text-gray-400 font-medium">/ {maxAnimals}</span>
            </span>
          </div>
          <div className="w-full h-4 bg-gray-50 rounded-xl p-1 border border-gray-100">
            <div
              className={`h-full rounded-lg transition-all duration-1000 ease-out ${theme.bg}`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
          {usagePercentage >= 90 && (
            <p className="text-[10px] text-red-500 font-black uppercase tracking-tighter">
              ⚠️ Capacity almost full
            </p>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-8">
        <button className="w-full group bg-gray-50 hover:bg-green-600 hover:text-white border border-gray-100 rounded-2xl p-4 transition-all flex items-center justify-between active:scale-[0.98]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-green-500">
              <Zap
                size={16}
                className="text-amber-500 group-hover:text-white"
                fill="currentColor"
              />
            </div>
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-tight">
                Upgrade Plan
              </p>
              <p className="text-[10px] opacity-60">Unlock AI & more animals</p>
            </div>
          </div>
          <ChevronRight
            size={18}
            className="opacity-30 group-hover:opacity-100"
          />
        </button>
      </div>
    </div>
  );
};

export default UserPlanStatus;
