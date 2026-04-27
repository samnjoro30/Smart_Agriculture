'use client';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  //   Defs,
  //   LinearGradient,
  //   Stop
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// --- Custom Tooltip to match your UI ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border-none shadow-2xl rounded-2xl ring-1 ring-black/5">
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">
          {label}
        </p>
        <p className="text-lg font-black text-emerald-600">
          {payload[0].value.toLocaleString()}{' '}
          <span className="text-xs font-bold text-gray-400">Liters</span>
        </p>
      </div>
    );
  }
  return null;
};

export function ProductionTrendChart({ data }: { data: any[] }) {
  // Format the date from the backend (YYYY-MM-DD) to a shorter version (e.g., "12 Apr")
  const formattedData = data.map((item) => ({
    ...item,
    displayDate: new Date(item.day).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    }),
  }));

  return (
    <div className="w-full h-[350px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formattedData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLiters" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#f0f0f0"
          />

          <XAxis
            dataKey="displayDate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
            dy={15}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="liters"
            stroke="#10b981"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorLiters)"
            animationBegin={200}
            animationDuration={1200}
            dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
