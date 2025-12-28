const EducationView = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold">Disaster Preparedness</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       <div className="bg-surface p-6 rounded-xl border border-slate-700">
         <h3 className="font-bold text-lg mb-2">Floods</h3>
         <ul className="list-disc pl-5 space-y-2 text-slate-300">
           <li>Move to higher ground immediately.</li>
           <li>Disconnect electrical appliances.</li>
           <li>Do not walk through moving water.</li>
         </ul>
       </div>
       <div className="bg-surface p-6 rounded-xl border border-slate-700">
         <h3 className="font-bold text-lg mb-2">Earthquakes</h3>
         <ul className="list-disc pl-5 space-y-2 text-slate-300">
           <li>Drop, Cover, and Hold On.</li>
           <li>Stay away from glass and windows.</li>
           <li>If outdoors, stay in the open away from buildings.</li>
         </ul>
       </div>
       <div className="bg-surface p-6 rounded-xl border border-slate-700">
         <h3 className="font-bold text-lg mb-2">Emergency Kit</h3>
         <ul className="list-disc pl-5 space-y-2 text-slate-300">
           <li>Water (one gallon per person per day).</li>
           <li>Non-perishable food.</li>
           <li>Flashlight and batteries.</li>
           <li>First aid kit.</li>
         </ul>
       </div>
    </div>
  </div>
);

export default EducationView;
