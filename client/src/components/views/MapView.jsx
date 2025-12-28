import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';

// Fix leaflet icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = () => {
  const [alerts, setAlerts] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aRes, rRes] = await Promise.all([
           axios.get('/api/alerts'),
           axios.get('/api/resources')
        ]);
        setAlerts(aRes.data);
        setResources(rRes.data);
      } catch (e) {}
    };
    fetchData();
  }, []);

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-slate-700 relative z-0">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {alerts.filter(a => a.lat && a.lng).map(alert => (
          <Marker key={`alert-${alert.id}`} position={[alert.lat, alert.lng]}>
            <Popup>
              <strong>{alert.hazard}</strong> ({alert.severity})<br/>
              {alert.message}
            </Popup>
          </Marker>
        ))}

        {resources.filter(r => r.lat && r.lng).map(res => (
          <Marker key={`res-${res.id}`} position={[res.lat, res.lng]}>
             <Popup>
              <strong>{res.name}</strong><br/>
              Type: {res.type}<br/>
              Available: {res.available}
             </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
