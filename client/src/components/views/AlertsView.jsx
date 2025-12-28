import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';

const AlertsView = () => {
  const [alerts, setAlerts] = useState([]);
  const socket = useSocket();
  const { user } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({ hazard: 'Flood', severity: 'Medium', message: '', state: '', district: '', area: '' });

  useEffect(() => {
    fetchAlerts();
    if (socket) {
      socket.on('new_alert', (newAlert) => {
        setAlerts(prev => [newAlert, ...prev]);
      });
    }
    return () => {
      if (socket) socket.off('new_alert');
    };
  }, [socket]);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get('/api/alerts');
      setAlerts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/alerts', formData);
      setFormData({ hazard: 'Flood', severity: 'Medium', message: '', state: '', district: '', area: '' });
    } catch (err) {
      alert('Failed to send alert');
    }
  };

  const isAdmin = user?.role === 'authority' || user?.role === 'ndrf';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-bold mb-4">Active Alerts</h2>
        {alerts.map(alert => (
          <div key={alert.id} className="bg-surface p-4 rounded-lg border border-slate-700 flex gap-4">
             <div className={`w-1 shrink-0 rounded-full ${
               alert.severity === 'Severe' || alert.severity === 'High' ? 'bg-red-500' : 
               alert.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
             }`}></div>
             <div>
               <div className="flex items-center gap-2 mb-1">
                 <span className="font-bold text-white">{alert.hazard}</span>
                 <span className={`text-xs px-2 py-0.5 rounded ${
                   alert.severity === 'Severe' || alert.severity === 'High' ? 'bg-red-500/20 text-red-300' : 
                   alert.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'
                 }`}>{alert.severity}</span>
                 <span className="text-xs text-slate-500">{new Date(alert.createdAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
               </div>
               <p className="text-slate-300">{alert.message}</p>
               <div className="text-xs text-slate-500 mt-2">{alert.area} {alert.district && `• ${alert.district}`}</div>
             </div>
          </div>
        ))}
        {alerts.length === 0 && <div className="text-slate-500 italic">No active alerts.</div>}
      </div>

      {isAdmin && (
        <div className="bg-surface p-6 rounded-xl border border-slate-700 h-fit">
          <h3 className="font-bold mb-4">Broadcast Alert</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-slate-400">Hazard</label>
              <select 
                className="w-full bg-dark border border-slate-700 rounded p-2 text-sm"
                value={formData.hazard} onChange={e=>setFormData({...formData, hazard: e.target.value})}
              >
                {['Flood', 'Cyclone', 'Earthquake', 'Fire', 'Heatwave', 'Drought'].map(h=><option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Severity</label>
              <select 
                className="w-full bg-dark border border-slate-700 rounded p-2 text-sm"
                value={formData.severity} onChange={e=>setFormData({...formData, severity: e.target.value})}
              >
                {['Low', 'Medium', 'High', 'Severe'].map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Message</label>
              <textarea 
                required
                className="w-full bg-dark border border-slate-700 rounded p-2 text-sm" rows="3"
                value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <div>
              <label className="text-xs text-slate-400">Area</label>
              <input 
                type="text" required
                className="w-full bg-dark border border-slate-700 rounded p-2 text-sm"
                value={formData.area} onChange={e=>setFormData({...formData, area: e.target.value})}
              />
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium transition">
              Broadcast
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AlertsView;
