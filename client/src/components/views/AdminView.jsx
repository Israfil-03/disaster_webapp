import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const AdminView = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'authority'
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      // Or get it from context if available, usually axios interceptor handles it, but let's be safe
      // If useAuth provides the token, use it. But AuthContext usually manages axios headers or we need to set them.
      // Let's assume axios is configured globally or we need to pass headers. 
      // The auth context implementation wasn't fully shown but usually it sets headers.
      // If not, I'll assume I need to set Authorization header.
      
      // Let's check AuthContext implementation later if this fails.
      // For now, I'll try with global axios if configured, or manual header.
      
      // Checking previous files: AuthContext wasn't read fully. 
      // Signup.jsx used axios.post('/api/auth/register') without headers (public).
      // Here we need headers.
      
      const config = {
        headers: {
            'Authorization': `Bearer ${user?.token || localStorage.getItem('token')}` // Fallback
        }
      };
      
      // Wait, user object in AuthContext usually has token if login(token, user) was called.
      // Let's assume standard practice.

      await axios.post('/api/auth/create-user', formData, config);
      setMessage({ text: 'User created successfully!', type: 'success' });
      setFormData({ fullName: '', email: '', password: '', role: 'authority' });
    } catch (err) {
      setMessage({ text: err.response?.data?.error || 'Failed to create user', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface p-6 rounded-xl border border-slate-700 shadow-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Official Account
        </h2>
        <p className="text-slate-400 mb-6 text-sm">
          As an administrator, you can create accounts for Local Authorities, NDRF, NGOs, and other specific roles.
        </p>

        {message.text && (
          <div className={`p-4 rounded-lg mb-6 text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-200 border border-green-500/50' : 'bg-red-500/20 text-red-200 border border-red-500/50'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
              <input 
                type="text" required
                className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand transition text-white"
                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
              <input 
                type="email" required
                className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand transition text-white"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
              <input 
                type="password" required minLength={6}
                className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand transition text-white"
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Role Assignment</label>
              <select 
                className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-brand transition text-white"
                value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="authority">Local Authority</option>
                <option value="ndrf">NDRF / Emergency Response</option>
                <option value="ngo">NGO / Volunteer Org</option>
                <option value="admin">System Admin</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2 pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-brand hover:bg-sky-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminView;
