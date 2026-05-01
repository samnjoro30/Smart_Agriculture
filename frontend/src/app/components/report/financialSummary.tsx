import React from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface SummaryProps {
  reportData: {
    total_income: number;
    total_expense: number;
    net_profit: number;
  };
}

const FinancialSummary: React.FC<SummaryProps> = ({ reportData }) => {
  const isProfitable = reportData.net_profit >= 0;

  const stats = [
    {
      label: 'Total Revenue',
      value: reportData.total_income,
      icon: TrendingUp,
      color: 'green',
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100',
    },
    {
      label: 'Total Expenses',
      value: reportData.total_expense,
      icon: TrendingDown,
      color: 'red',
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-100',
    },
    {
      label: 'Net Profit',
      value: reportData.net_profit,
      icon: Wallet,
      color: isProfitable ? 'blue' : 'orange',
      bg: isProfitable ? 'bg-blue-50' : 'bg-orange-50',
      text: isProfitable ? 'text-blue-600' : 'text-orange-600',
      border: isProfitable ? 'border-blue-100' : 'border-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`relative overflow-hidden bg-white p-6 rounded-3xl border ${stat.border} shadow-sm transition-all hover:shadow-md group`}
        >
          {/* Subtle Background Icon Decoration */}
          <stat.icon 
            className={`absolute -right-4 -bottom-4 h-24 w-24 opacity-[0.03] transition-transform group-hover:scale-110 group-hover:-rotate-12 ${stat.text}`} 
          />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <h2 className={`text-2xl lg:text-3xl font-black ${stat.text} tracking-tight`}>
                <span className="text-sm mr-1 opacity-70">KES</span>
                {stat.value.toLocaleString()}
              </h2>
            </div>

            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.text} shadow-inner`}>
              <stat.icon size={24} strokeWidth={2.5} />
            </div>
          </div>

          {/* Footer Visual Aid */}
          <div className="mt-4 flex items-center gap-2 relative z-10">
            {stat.label === 'Net Profit' ? (
              <div className={`flex items-center gap-1 text-xs font-bold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                {isProfitable ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{isProfitable ? 'Profitable Period' : 'Loss Detected'}</span>
              </div>
            ) : (
              <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full opacity-40 ${index === 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: '60%' }} 
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialSummary;