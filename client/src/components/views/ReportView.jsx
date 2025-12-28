import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';

const ReportView = () => {
  const [reports, setReports] = useState([]);
  const socket = useSocket();
  const [formData, setFormData] = useState({ type: 'Flood', description: '', location: '', contact: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchReports();
    if (socket) {
      socket.on('new_report', (newReport) => setReports(prev => [newReport, ...prev]));
      socket.on('report_update', (updated) => {
        setReports(prev => prev.map(r => r.id === updated.id ? updated : r));
      });
    }
    return () => {
      if (socket) {
        socket.off('new_report');
        socket.off('report_update');
      }
    };
  }, [socket]);

  const fetchReports = async () => {
    try {
      const res = await axios.get('/api/reports');
      setReports(res.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reports', formData);
      setFormData({ type: 'Flood', description: '', location: '', contact: '' });
      setMsg('Report submitted successfully!');
      setTimeout(()=>setMsg(''), 3000);
    } catch (err) {
      alert('Failed to submit report');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold mb-4 text-xl">Report Incident</h3>
          {msg && <div className="mb-3 text-green-400 text-sm">{msg}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-slate-400">Incident Type</label>
              <select 
                className="w-full bg-dark border border-slate-700 rounded-lg p-2.5 text-white"
                value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})}
              >
                {['Flood', 'Cyclone', 'Earthquake', 'Fire', 'Accident', 'Other'].map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400">Description</label>
              <textarea 
                required
                className="w-full bg-dark border border-slate-700 rounded-lg p-2.5 text-white" rows="3"
                value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="text-sm text-slate-400">Location</label>
              <input 
                type="text" required
                className="w-full bg-dark border border-slate-700 rounded-lg p-2.5 text-white"
                value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm text-slate-400">Contact (Optional)</label>
              <input 
                type="text"
                className="w-full bg-dark border border-slate-700 rounded-lg p-2.5 text-white"
                value={formData.contact} onChange={e=>setFormData({...formData, contact: e.target.value})}
              />
            </div>
            <button className="w-full bg-brand hover:bg-sky-600 text-white py-2.5 rounded-lg font-semibold transition">
              Submit Report
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-bold text-xl">Recent Reports</h3>
        <div className="space-y-3">
          {reports.map(report => (
            <div key={report.id} className="bg-surface p-4 rounded-lg border border-slate-700 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-200">{report.type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    report.status === 'Verified' ? 'bg-green-500/20 text-green-300' : 
                    report.status === 'Rejected' ? 'bg-red-500/20 text-red-300' : 'bg-slate-700 text-slate-300'
                  }`}>{report.status}</span>
                  <span className="text-xs text-slate-500">{new Date(report.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
                <p className="text-slate-400 text-sm">{report.description}</p>
                <div className="text-xs text-slate-500 mt-2">📍 {report.location}</div>
              </div>
            </div>
          ))}
          {reports.length === 0 && <p className="text-slate-500 italic">No reports yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default ReportView;
