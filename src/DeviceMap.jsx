import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [44.8176, 20.4569];
const defaultZoom = 13;

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function FlyToDevice({ flyToKey, markersRef }) {
  const map = useMap();

  useEffect(() => {
    if (flyToKey) {
      const key = flyToKey.deviceId + flyToKey.timestamp;
      const marker = markersRef.current[key];
      if (marker) {
        const pos = [flyToKey.latitude, flyToKey.longitude];
        map.flyTo(pos, 16, { duration: 1 });
        marker.openPopup();
      }
    }
  }, [flyToKey, map, markersRef]);

  return null;
}

export default function DeviceMap({ devices = [], flyToKey, aliases = {} }) {
  const markersRef = useRef({});

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {devices
        .filter((d) => d.latitude != null && d.longitude != null)
        .map((device) => {
          const key = device.deviceId + device.timestamp;
          return (
            <Marker
              key={key}
              position={[device.latitude, device.longitude]}
              ref={(el) => {
                if (el) markersRef.current[key] = el;
              }}
            >
              <Popup>
                <strong>{aliases[device.deviceId] ?? device.deviceId}</strong>
                <br />
                {new Date(device.timestamp).toLocaleString()}
                <br />
                Temp: {device.temperature}°C, Battery: {device.battery}%
              </Popup>
            </Marker>
          );
        })}
      <FlyToDevice flyToKey={flyToKey} markersRef={markersRef} />
    </MapContainer>
  );
}
