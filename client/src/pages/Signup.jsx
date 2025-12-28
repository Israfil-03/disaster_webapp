import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', role: 'citizen' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-darker">
      <div className="w-full max-w-md bg-surface p-8 rounded-xl border border-slate-700 shadow-2xl">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <img src="/assets/icons/app-mark.svg" alt="Logo" className="w-12 h-12 mx-auto mb-4" />
          </Link>
          <h2 className="text-2xl font-bold">Create Account</h2>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
            <input 
              type="text" required
              className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand transition text-white"
              value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
            <input 
              type="email" required
              className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand transition text-white"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
            <input 
              type="password" required
              className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand transition text-white"
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Role</label>
            <select 
              className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand transition text-white"
              value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
            >
              <option value="citizen">Citizen</option>
              <option value="authority">Local Authority</option>
              <option value="ndrf">NDRF / Emergency</option>
              <option value="ngo">NGO / Volunteer</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-brand hover:bg-sky-600 text-white py-2 rounded-lg font-semibold transition mt-2">
            Sign Up
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-slate-400">
          Already have an account? <Link to="/login" className="text-brand hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
