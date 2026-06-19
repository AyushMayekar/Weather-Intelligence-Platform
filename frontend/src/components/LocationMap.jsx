import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker icon paths (Vite asset bundling breaks Leaflet's default lookup)
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Recenter({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function LocationMap({ latitude, longitude, location }) {
  return (
    <div className="card p-3 sm:p-4 fade-in">
      <h3 className="font-semibold text-sm mb-3 px-2" style={{ color: 'var(--text-primary)' }}>
        Location Map
      </h3>
      <div style={{ height: '320px', width: '100%' }}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={11}
          style={{ height: '100%', width: '100%', borderRadius: 'var(--radius-md)' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]} icon={defaultIcon}>
            <Popup>{location}</Popup>
          </Marker>
          <Recenter lat={latitude} lon={longitude} />
        </MapContainer>
      </div>
    </div>
  );
}
