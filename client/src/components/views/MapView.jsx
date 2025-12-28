import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
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
  const [quakes, setQuakes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aRes, rRes] = await Promise.all([
           axios.get('/api/alerts'),
           axios.get('/api/resources')
        ]);
        setAlerts(aRes.data);
        setResources(rRes.data);
      } catch (e) {
        console.error("Failed to fetch internal data", e);
      }
    };
    
    const fetchQuakes = async () => {
        try {
            const res = await axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson');
            setQuakes(res.data.features);
        } catch (e) {
            console.error("Failed to fetch USGS data", e);
        }
    }

    fetchData();
    fetchQuakes();
  }, []);

  const getMarkerColor = (mag) => {
      if (mag > 6) return '#ef4444'; // red-500
      if (mag > 4) return '#f97316'; // orange-500
      return '#eab308'; // yellow-500
  };

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-slate-700 relative z-0">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={true} className="h-full w-full bg-slate-900">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Live Earthquakes */}
        {quakes.map(quake => {
            const [lng, lat] = quake.geometry.coordinates;
            return (
                <CircleMarker 
                    key={quake.id} 
                    center={[lat, lng]}
                    pathOptions={{ 
                        color: getMarkerColor(quake.properties.mag),
                        fillColor: getMarkerColor(quake.properties.mag),
                        fillOpacity: 0.6,
                        weight: 1
                    }}
                    radius={quake.properties.mag * 3}
                >
                    <Popup className="custom-popup">
                        <div className="text-slate-800">
                            <strong>Magnitude {quake.properties.mag} Earthquake</strong><br/>
                            {quake.properties.place}<br/>
                            {new Date(quake.properties.time).toLocaleString()}
                        </div>
                    </Popup>
                </CircleMarker>
            )
        })}

        {alerts.filter(a => a.lat && a.lng).map(alert => (
          <Marker key={`alert-${alert.id}`} position={[alert.lat, alert.lng]}>
            <Popup>
              <div className="text-slate-800">
                <strong>{alert.hazard}</strong> ({alert.severity})<br/>
                {alert.message}
              </div>
            </Popup>
          </Marker>
        ))}

        {resources.filter(r => r.lat && r.lng).map(res => (
          <Marker key={`res-${res.id}`} position={[res.lat, res.lng]}>
             <Popup>
              <div className="text-slate-800">
                <strong>{res.name}</strong><br/>
                Type: {res.type}<br/>
                Available: {res.available}
              </div>
             </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
