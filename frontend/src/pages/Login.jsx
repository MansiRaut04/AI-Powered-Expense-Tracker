import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <form onSubmit={handleSubmit} className="bg-paper rounded p-8 w-full max-w-sm space-y-5">
        <h1 className="font-display text-2xl font-semibold text-text">Log in</h1>

        {error && (
          <p className="text-sm text-rust border-l-2 border-rust pl-3 font-mono">{error}</p>
        )}

        <label className="block">
          <span className="text-xs text-text-dim font-mono">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-rule py-2 font-mono text-sm focus:outline-none focus:border-brass"
          />
        </label>

        <label className="block">
          <span className="text-xs text-text-dim font-mono">Password</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-rule py-2 font-mono text-sm focus:outline-none focus:border-brass"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brass text-paper rounded py-2.5 font-mono text-sm font-medium hover:bg-brass-dark disabled:opacity-50 transition-colors"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>

        <p className="text-sm text-text-dim font-mono">
          No account?{' '}
          <Link to="/signup" className="text-brass hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}