import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function MonthlyChart({ byMonth }) {
  if (!byMonth || byMonth.length === 0) {
    return <p className="text-paper-dim text-sm font-mono">No monthly data yet.</p>;
  }

  const data = byMonth.map((m) => ({ label: `${MONTH_NAMES[m.month - 1]} ${m.year}`, total: m.total }));

  return (
    <div className="bg-paper rounded p-4">
      <h2 className="font-mono text-sm text-text-dim mb-2">Spending by month</h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid stroke="#C9C1A8" strokeDasharray="0" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
          <YAxis tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
          <Tooltip
            formatter={(value) => `$${Number(value).toFixed(2)}`}
            contentStyle={{ fontFamily: 'IBM Plex Mono', fontSize: 12, borderRadius: 4 }}
          />
          <Bar dataKey="total" fill="#BB8A3F" radius={[2, 2, 0, 0]} barSize={80} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}