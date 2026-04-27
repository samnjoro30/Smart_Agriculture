'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border-none shadow-2xl rounded-2xl ring-1 ring-black/5">
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">
          {data.session} Session
        </p>
        <p className="text-lg font-black text-emerald-600">
          KES {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function SessionRevenueChart({ data }: { data: any[] }) {
  // Mapping session names to specific brand colors
  const COLORS: Record<string, string> = {
    morning: '#10b981', // Emerald 500
    evening: '#0f766e', // Teal 700
    bulk: '#6366f1', // Indigo 500 (backup if bulk is returned)
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: -10, bottom: 0 }}
          barSize={45}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#f0f0f0"
          />

          <XAxis
            dataKey="session"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} //textTransform: 'uppercase'
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }}
            tickFormatter={(value) => `Ksh ${value / 1000}k`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />

          <Bar
            dataKey="revenue"
            radius={[12, 12, 12, 12]} // Fully rounded pill shape
            animationBegin={300}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.session.toLowerCase()] || '#10b981'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend / Key */}
      <div className="flex justify-center gap-6 mt-6">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[entry.session.toLowerCase()] }}
            />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              {entry.session}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
