// import { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
// import ExpenseForm from '../components/ExpenseForm';
// import ExpenseList from '../components/ExpenseList';
// import { getExpenses, deleteExpense } from '../api/expenses';

// export default function Dashboard() {
//   const [expenses, setExpenses] = useState([]);
//   const [editingExpense, setEditingExpense] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchExpenses = async () => {
//     try {
//       const { data } = await getExpenses();
//       setExpenses(data);
//     } catch (err) {
//       console.error('Failed to fetch expenses', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const handleSaved = () => {
//     setEditingExpense(null);
//     fetchExpenses();
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Delete this expense?')) return;
//     await deleteExpense(id);
//     fetchExpenses();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-3xl mx-auto p-6 space-y-6">
//         <ExpenseForm
//           editingExpense={editingExpense}
//           onSaved={handleSaved}
//           onCancelEdit={() => setEditingExpense(null)}
//         />

//         {loading ? (
//           <p className="text-gray-500 text-sm">Loading expenses...</p>
//         ) : (
//           <ExpenseList
//             expenses={expenses}
//             onEdit={setEditingExpense}
//             onDelete={handleDelete}
//           />
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import StatsCard from '../components/StatsCard';
import CategoryChart from '../components/CategoryChart';
import MonthlyChart from '../components/MonthlyChart';
import { getExpenses, deleteExpense, getSummary } from '../api/expenses';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const [expRes, summaryRes] = await Promise.all([
        getExpenses(),
        getSummary(),
      ]);
      setExpenses(expRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSaved = () => {
    setEditingExpense(null);
    fetchAll();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this expense?')) return;
    await deleteExpense(id);
    fetchAll();
  };

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <div className="w-full px-8 py-6 space-y-6">
        {!loading && summary && (
          <>
            <StatsCard totalSpent={summary.totalSpent} />
            <div className="grid md:grid-cols-2 gap-6">
              <CategoryChart byCategory={summary.byCategory} />
              <MonthlyChart byMonth={summary.byMonth} />
            </div>
          </>
        )}

        <ExpenseForm
          editingExpense={editingExpense}
          onSaved={handleSaved}
          onCancelEdit={() => setEditingExpense(null)}
        />

        {loading ? (
          <p className="text-gray-500 text-sm">Loading expenses...</p>
        ) : (
          <ExpenseList
            expenses={expenses}
            onEdit={setEditingExpense}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}