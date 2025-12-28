const DonateView = () => (
  <div className="max-w-2xl mx-auto text-center space-y-8 py-10">
    <h2 className="text-3xl font-bold">Support Relief Efforts</h2>
    <p className="text-slate-400">
      Your contribution helps provide shelters, medical aid, food, and logistics to affected communities.
      We partner with official national relief funds.
    </p>
    <div className="bg-surface p-8 rounded-2xl border border-slate-700">
       <div className="text-5xl mb-4">🤝</div>
       <h3 className="text-xl font-bold mb-4">Prime Minister's National Relief Fund</h3>
       <p className="mb-6 text-sm text-slate-400">Directly support national disaster response.</p>
       <a href="https://pmnrf.gov.in/en/online-donation" target="_blank" rel="noreferrer" 
          className="inline-block px-8 py-3 bg-brand text-white rounded-full font-bold hover:bg-sky-600 transition">
         Donate Now
       </a>
    </div>
  </div>
);

export default DonateView;
