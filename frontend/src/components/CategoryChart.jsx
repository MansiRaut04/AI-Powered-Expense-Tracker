import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#BB8A3F', '#9C4A32', '#3E6259', '#7A6C3F', '#5C7A8A', '#7A5C6E', '#8A7550'];

export default function CategoryChart({ byCategory }) {
  if (!byCategory || byCategory.length === 0) {
    return <p className="text-paper-dim text-sm font-mono">No category data yet.</p>;
  }

  return (
    <div className="bg-paper rounded p-4">
      <h2 className="font-mono text-sm text-text-dim mb-2">Spending by category</h2>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={byCategory}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
          >
            {byCategory.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${Number(value).toFixed(2)}`}
            contentStyle={{ fontFamily: 'IBM Plex Mono', fontSize: 12, borderRadius: 4 }}
          />
          <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}