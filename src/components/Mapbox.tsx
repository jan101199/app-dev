'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapProps = {
  lat: number;
  lng: number;
};

export default function Mapbox({ lat, lng }: MapProps) {
  // ⚙️ Grab your token from .env.local
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  if (!mapboxAccessToken) {
    console.error('⚠️ NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not defined!');
    return <div className="text-red-500">Mapbox token missing</div>;
  }

  // Assign it to mapbox-gl
  mapboxgl.accessToken = mapboxAccessToken;

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 12,
    });

    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);

    return () => map.remove();
  }, [lat, lng]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
