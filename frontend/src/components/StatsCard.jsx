export default function StatsCard({ totalSpent }) {
  return (
    <div className="bg-paper rounded p-6">
      <p className="text-xs text-text-dim font-mono">Balance forward</p>
      <p className="font-display text-4xl font-semibold text-text mt-1">
        ${Number(totalSpent || 0).toFixed(2)}
      </p>
    </div>
  );
}