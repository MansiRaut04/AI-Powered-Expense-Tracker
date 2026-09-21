import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-ink border-b border-ink-light px-6 py-4 flex justify-between items-center">
      <h1 className="font-display text-xl font-semibold text-paper tracking-wide">
        Expense Tracker
      </h1>
      <div className="flex items-center gap-5 font-mono text-sm">
        <span className="text-paper-dim">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="text-brass hover:text-paper transition-colors"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}