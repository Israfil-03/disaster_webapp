const DashboardView = ({ setActiveTab }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Overview</h2>
        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/20">
          System Operational
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400 font-medium mb-2">Active Alerts</h3>
          <div className="text-3xl font-bold text-white">3</div>
          <div className="text-sm text-red-400 mt-1">1 High Priority</div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400 font-medium mb-2">Reports Queue</h3>
          <div className="text-3xl font-bold text-white">12</div>
          <div className="text-sm text-yellow-400 mt-1">5 Pending Verification</div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400 font-medium mb-2">Resources</h3>
          <div className="text-3xl font-bold text-white">8</div>
          <div className="text-sm text-brand mt-1">Shelters Open</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setActiveTab('report')} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
              Report Incident
            </button>
            <button onClick={() => setActiveTab('alerts')} className="bg-brand hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition">
              View Alerts
            </button>
            <button onClick={() => setActiveTab('volunteers')} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition">
              Join Volunteers
            </button>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-slate-700">
          <h3 className="font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-2"><span className="text-slate-500">10:05</span> Heavy Rain alert issued for Kerala</li>
            <li className="flex gap-2"><span className="text-slate-500">09:45</span> New flood report in Bihar verified</li>
            <li className="flex gap-2"><span className="text-slate-500">09:30</span> 2 volunteers joined in Mumbai</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
