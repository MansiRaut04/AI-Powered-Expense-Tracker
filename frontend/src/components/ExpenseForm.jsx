import { useState, useEffect } from 'react';
import { createExpense, updateExpense } from '../api/expenses';

const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Other'];

export default function ExpenseForm({ editingExpense, onSaved, onCancelEdit }) {
  const [form, setForm] = useState({ description: '', amount: '', category: '', date: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        description: editingExpense.description,
        amount: editingExpense.amount,
        category: editingExpense.category || '',
        date: editingExpense.date?.slice(0, 10) || '',
      });
    } else {
      setForm({ description: '', amount: '', category: '', date: '' });
    }
  }, [editingExpense]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload = {
      description: form.description,
      amount: Number(form.amount),
      ...(form.category && { category: form.category }),
      ...(form.date && { date: form.date }),
    };
    try {
      if (editingExpense) await updateExpense(editingExpense._id, payload);
      else await createExpense(payload);
      setForm({ description: '', amount: '', category: '', date: '' });
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-paper rounded p-5 space-y-4">
      <h2 className="font-display text-lg font-semibold text-text">
        {editingExpense ? 'Edit entry' : 'New entry'}
      </h2>

      {error && <p className="text-sm text-rust border-l-2 border-rust pl-3 font-mono">{error}</p>}

      <label className="block">
        <span className="text-sm font-medium text-text-dim font-mono">Description</span>
        <input
          name="description"
          type="text"
          placeholder="Uber ride to airport"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-rule py-2 font-mono text-sm focus:outline-none focus:border-brass placeholder:text-text-dim/50"
        />
      </label>

      <div className="flex gap-4">
        <label className="w-1/2">
          <span className="text-sm font-medium text-text-dim font-mono">Amount</span>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-rule py-2 font-mono text-sm focus:outline-none focus:border-brass"
          />
        </label>
        <label className="w-1/2">
          <span className="text-sm font-medium text-text-dim font-mono">Date</span>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-rule py-2 font-mono text-sm focus:outline-none focus:border-brass"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-text-dim font-mono">Category</span>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-rule py-2 font-mono text-sm focus:outline-none focus:border-brass"
        >
          <option value="">Auto-detect (AI)</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-brass text-paper rounded py-2.5 font-mono text-sm font-medium hover:bg-brass-dark disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving…' : editingExpense ? 'Update entry' : 'Add entry'}
        </button>
        {editingExpense && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 rounded border border-rule text-text-dim font-mono text-sm hover:bg-paper-dim transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}