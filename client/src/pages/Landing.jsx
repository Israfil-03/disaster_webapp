import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-darker text-slate-200 selection:bg-brand selection:text-white">
      {/* Navbar */}
      <header className="fixed w-full border-b border-white/5 bg-darker/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
                <div className="absolute inset-0 bg-brand blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img src="/assets/icons/app-mark.svg" alt="AadhyaPath" className="w-10 h-10 relative z-10" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">AadhyaPath</span>
          </div>
          <div className="flex gap-6 items-center">
            <Link to="/login" className="text-slate-400 hover:text-white font-medium transition">Login</Link>
            <Link to="/signup" className="px-6 py-2.5 bg-brand text-white rounded-full hover:bg-sky-500 transition font-medium shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transform hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
             <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl"></div>
             <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-sky-400 mb-8 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Live Disaster Response System
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Response in</span> <br />
              <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">Real-Time.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
              A unified platform connecting citizens, NGOs, and the NDRF. 
              Get verified alerts, track resources on live maps, and coordinate rescue operations instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link to="/signup" className="px-10 py-4 bg-brand text-white text-lg rounded-full font-bold hover:bg-sky-500 transition shadow-xl shadow-sky-500/20 hover:shadow-sky-500/40">
                Join the Network
              </Link>
              <Link to="/login" className="px-10 py-4 bg-slate-800/50 text-white text-lg rounded-full font-bold border border-slate-700 hover:bg-slate-800 transition hover:border-slate-600 backdrop-blur-sm">
                View Live Map
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-surface/30 border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Advanced Disaster Management</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Equipped with tools for every stage of disaster response, from early warning to recovery.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon="/assets/icons/hazard-multi.svg"
                title="Real-Time Alerts"
                desc="Instant notifications for earthquakes, floods, and cyclones sourced from global monitoring agencies."
              />
              <FeatureCard 
                icon="/assets/icons/map.svg"
                title="Live Resource Mapping"
                desc="Interactive maps showing verified shelters, hospitals, and food supply centers near you."
              />
              <FeatureCard 
                icon="/assets/icons/profile.svg"
                title="Volunteer Coordination"
                desc="Seamlessly connect volunteers with local authorities to deploy help where it's needed most."
              />
               <FeatureCard 
                icon="/assets/icons/hazard-health.svg"
                title="Medical Assistance"
                desc="Priority routing for medical emergencies and ambulance tracking during crises."
              />
              <FeatureCard 
                icon="/assets/icons/video.svg"
                title="Education & Training"
                desc="Access library of training videos and guides for disaster preparedness and safety."
              />
              <FeatureCard 
                icon="/assets/icons/bell.svg"
                title="SOS Reporting"
                desc="One-tap SOS signal broadcasting your location to nearby rescue teams and authorities."
              />
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 bg-darker border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/assets/icons/app-mark.svg" alt="Logo" className="w-8 h-8 opacity-50 grayscale" />
            <span className="font-semibold text-slate-500">AadhyaPath</span>
          </div>
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} AadhyaPath. Built for humanity.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-brand/30 hover:bg-slate-800/50 transition duration-300 group">
    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand/10 transition duration-300">
      <img src={icon} alt="" className="w-6 h-6 group-hover:brightness-110 transition" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand transition">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
