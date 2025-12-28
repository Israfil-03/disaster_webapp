import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-slate-800 bg-dark/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/assets/icons/app-mark.svg" alt="AadhyaPath" className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight">AadhyaPath</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 hover:text-white transition">Login</Link>
            <Link to="/signup" className="px-4 py-2 bg-brand text-white rounded-md hover:bg-sky-600 transition font-medium">Get Started</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent pb-2">
            Crisis Response for Every Community
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real-time alerts, coordinated volunteer efforts, and verified resource tracking. 
            AadhyaPath connects authorities, responders, and citizens when it matters most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link to="/signup" className="px-8 py-3 bg-brand text-white text-lg rounded-full font-semibold hover:bg-sky-600 transition shadow-lg shadow-sky-500/20">
              Create Account
            </Link>
            <Link to="/login" className="px-8 py-3 border border-slate-700 bg-slate-800/50 text-white text-lg rounded-full font-semibold hover:bg-slate-800 transition">
              Log In
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        © {new Date().getFullYear()} AadhyaPath. Community Crisis Response.
      </footer>
    </div>
  );
};

export default Landing;
