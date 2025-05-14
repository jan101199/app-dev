'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

type Props = {
  onSelect: (address: string) => void;
};

function LocationMarker({ onSelect }: { onSelect: (address: string) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onSelect(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function AddressPicker({ onSelect }: Props) {
  return (
    <div className="w-full h-64 mt-4 border rounded overflow-hidden">
      <MapContainer center={[13.41, 122.56]} zoom={6} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker onSelect={onSelect} />
      </MapContainer>
    </div>
  );
}
