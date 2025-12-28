import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Dynamic import of views would be better but simple conditional render is fine here
  const renderView = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardView setActiveTab={setActiveTab} />;
      case 'alerts': return <AlertsView />;
      case 'report': return <ReportView />;
      case 'map': return <MapView />;
      case 'resources': return <ResourcesView />;
      case 'volunteers': return <VolunteersView />;
      case 'education': return <EducationView />;
      case 'donate': return <DonateView />;
      case 'admin': return <AdminView />;
      default: return <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-darker flex flex-col">
      {/* Header */}
      <header className="bg-surface border-b border-slate-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-brand flex items-center justify-center text-white font-bold">A</div>
             <div>
               <h1 className="font-bold leading-none">AadhyaPath</h1>
               <span className="text-xs text-slate-400">Dashboard</span>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <span className="text-sm px-2 py-1 rounded bg-slate-700 text-slate-300 capitalize hidden sm:inline-block">
               {user?.role}
             </span>
             <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">Sign Out</button>
          </div>
        </div>
        
        {/* Navigation Tabs (Scrollable on mobile) */}
        <div className="border-t border-slate-700 bg-surface/50 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <nav className="flex space-x-1 min-w-max">
              {['Dashboard', 'Alerts', 'Report', 'Map', 'Resources', 'Volunteers', 'Education', 'Donate'].map((tab) => {
                const id = tab.toLowerCase();
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      isActive 
                        ? 'border-brand text-brand' 
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
              {user?.role === 'admin' && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === 'admin'
                      ? 'border-brand text-brand' 
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  Admin
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {renderView()}
      </main>
    </div>
  );
};

// Placeholder imports - I will create these files next
import DashboardView from '../components/views/DashboardView';
import AlertsView from '../components/views/AlertsView';
import ReportView from '../components/views/ReportView';
import MapView from '../components/views/MapView';
import ResourcesView from '../components/views/ResourcesView';
import VolunteersView from '../components/views/VolunteersView';
import EducationView from '../components/views/EducationView';
import DonateView from '../components/views/DonateView';
import AdminView from '../components/views/AdminView';

export default Dashboard;
