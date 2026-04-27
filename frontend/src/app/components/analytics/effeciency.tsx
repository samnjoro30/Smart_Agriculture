'use client';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
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
          {data.cow_tag}
        </p>
        <p className="text-sm font-black text-gray-800 mb-1">{data.cow_name}</p>
        <p className="text-lg font-black text-emerald-600">
          {payload[0].value.toLocaleString()}{' '}
          <span className="text-xs font-bold text-gray-400">Liters</span>
        </p>
      </div>
    );
  }
  return null;
};

export function TopCowsChart({ data }: { data: any[] }) {
  // Sort data descending just in case the backend didn't
  const sortedData = [...data].sort((a, b) => b.total_liters - a.total_liters);

  // Gradient colors from Dark Emerald to Light Emerald
  const COLORS = ['#065f46', '#059669', '#10b981', '#34d399', '#6ee7b7'];

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={sortedData}
          margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
          barSize={32}
        >
          <XAxis type="number" hide />

          <YAxis
            dataKey="cow_name"
            type="category"
            axisLine={false}
            tickLine={false}
            width={100}
            tick={{ fill: '#374151', fontSize: 12, fontWeight: 800 }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />

          <Bar
            dataKey="total_liters"
            radius={[0, 10, 10, 0]} // Round only the right side
            animationBegin={500}
            animationDuration={1800}
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

            {/* Display the value at the end of the bar */}
            <LabelList
              dataKey="total_liters"
              position="right"
              style={{ fill: '#6b7280', fontSize: 11, fontWeight: 700 }}
              formatter={(value) =>
                typeof value === 'number' ? `${value} L` : ''
              }
              offset={15}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
