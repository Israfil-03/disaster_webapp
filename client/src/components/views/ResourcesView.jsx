import { useEffect, useState } from 'react';
import axios from 'axios';

const ResourcesView = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('/api/resources')
      .then(res => setResources(res.data))
      .catch(err => console.error(err));
  }, []);

  const seed = async () => {
    try { await axios.post('/api/resources/seed'); window.location.reload(); } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Resources & Shelters</h2>
        <button onClick={seed} className="text-xs text-slate-500 hover:text-white underline">Seed Data (Debug)</button>
      </div>

      <div className="overflow-x-auto bg-surface rounded-xl border border-slate-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-dark/50 text-slate-400 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Capacity</th>
              <th className="px-6 py-4 font-medium">Available</th>
              <th className="px-6 py-4 font-medium">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {resources.map(res => (
              <tr key={res.id} className="hover:bg-slate-800/50">
                <td className="px-6 py-4 font-medium text-white">{res.name}</td>
                <td className="px-6 py-4 capitalize">{res.type}</td>
                <td className="px-6 py-4">{res.capacity}</td>
                <td className="px-6 py-4 text-green-400 font-bold">{res.available}</td>
                <td className="px-6 py-4 text-slate-400">{res.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {resources.length === 0 && <div className="p-6 text-center text-slate-500">No resources found.</div>}
      </div>
    </div>
  );
};

export default ResourcesView;
