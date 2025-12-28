import { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteersView = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [formData, setFormData] = useState({ 
    fullName: '', email: '', phone: '', skills: [], availability: '', preferredLocation: '', motivation: '' 
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get('/api/volunteers').then(res => setVolunteers(res.data)).catch(()=>{});
  }, []);

  const handleSkillChange = (e) => {
    const val = e.target.value;
    const skills = formData.skills.includes(val) 
       ? formData.skills.filter(s => s !== val)
       : [...formData.skills, val];
    setFormData({...formData, skills});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/volunteers/apply', formData);
      setMsg('Application submitted! We will contact you shortly.');
      setFormData({ fullName: '', email: '', phone: '', skills: [], availability: '', preferredLocation: '', motivation: '' });
    } catch {
      setMsg('Error submitting application.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-bold mb-6">Volunteer Board</h2>
        <div className="space-y-4">
          {volunteers.length === 0 && <p className="text-slate-500">No active volunteers listed publicly yet.</p>}
          {volunteers.map(v => (
            <div key={v.id} className="bg-surface p-4 rounded-lg border border-slate-700">
               <div className="font-bold">{v.fullName}</div>
               <div className="text-sm text-slate-400">Skills: {v.skills.join(', ')}</div>
               <div className="text-sm text-brand">{v.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface p-6 rounded-xl border border-slate-700 h-fit">
        <h3 className="font-bold text-lg mb-4">Join the Force</h3>
        {msg && <div className="mb-4 text-brand bg-brand/10 p-2 rounded text-sm">{msg}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <input type="text" placeholder="Full Name" required className="bg-dark border border-slate-700 rounded p-2" 
               value={formData.fullName} onChange={e=>setFormData({...formData, fullName: e.target.value})} />
             <input type="email" placeholder="Email" required className="bg-dark border border-slate-700 rounded p-2"
               value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
          </div>
          <input type="text" placeholder="Phone" required className="w-full bg-dark border border-slate-700 rounded p-2"
             value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} />
          
          <div>
            <label className="block text-sm text-slate-400 mb-2">Skills</label>
            <div className="flex flex-wrap gap-2">
              {['First Aid', 'Search & Rescue', 'Logistics', 'Medical', 'Driving', 'Cooking'].map(skill => (
                <label key={skill} className="flex items-center gap-2 text-sm bg-dark px-3 py-1 rounded cursor-pointer hover:bg-slate-800">
                  <input type="checkbox" value={skill} checked={formData.skills.includes(skill)} onChange={handleSkillChange} />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <select className="w-full bg-dark border border-slate-700 rounded p-2" required
             value={formData.availability} onChange={e=>setFormData({...formData, availability: e.target.value})}
          >
            <option value="">Select Availability</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
            <option value="Evenings">Evenings</option>
            <option value="On-call">On-call / Emergency</option>
          </select>
          
          <textarea placeholder="Motivation (Optional)" className="w-full bg-dark border border-slate-700 rounded p-2" rows="2"
             value={formData.motivation} onChange={e=>setFormData({...formData, motivation: e.target.value})}></textarea>
             
          <button className="w-full bg-brand text-white py-2 rounded font-semibold hover:bg-sky-600 transition">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default VolunteersView;
