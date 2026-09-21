const CATEGORY_COLORS = {
  Food: '#BB8A3F', Travel: '#9C4A32', Bills: '#3E6259', Shopping: '#7A6C3F',
  Entertainment: '#5C7A8A', Health: '#7A5C6E', Other: '#8A7550',
};

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <p className="text-paper-dim text-sm font-mono px-1">No entries yet — add your first one above.</p>;
  }

  return (
    <div className="bg-paper rounded overflow-hidden">
      <div className="grid grid-cols-[90px_1fr_120px_90px_110px] gap-3 px-4 py-2 border-b border-rule text-xs text-text-dim font-mono">
        <span>Date</span>
        <span>Description</span>
        <span>Category</span>
        <span className="text-right">Amount</span>
        <span></span>
      </div>

      {expenses.map((exp) => (
        <div
          key={exp._id}
          className="grid grid-cols-[90px_1fr_120px_90px_110px] gap-3 px-4 py-3 border-b border-rule last:border-b-0 items-center font-mono text-sm"
        >
          <span className="text-text-dim text-sm font-medium">{new Date(exp.date).toLocaleDateString('en-GB')}</span>

          <span className="text-text truncate">
            {exp.description}
            <span className={exp.categorySource === 'AI' ? 'text-brass text-xs ml-2' : 'text-text-dim text-xs ml-2'}>
              [{exp.categorySource === 'AI' ? 'AI' : 'manual'}]
            </span>
          </span>

          <span className="flex items-center gap-2 text-text-dim text-sm font-medium">
            <span
              className="w-2.5 h-2.5 inline-block shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[exp.category] || '#8A7550' }}
            />
            {exp.category}
          </span>

          <span className="text-right text-text text-sm font-medium">${Number(exp.amount).toFixed(2)}</span>

          <span className="flex justify-end gap-3 text-xs">
            <button onClick={() => onEdit(exp)} className=" text-sm font-medium text-brass hover:underline">edit</button>
            <button onClick={() => onDelete(exp._id)} className=" text-sm font-medium text-rust hover:underline">delete</button>
          </span>
        </div>
      ))}
    </div>
  );
}