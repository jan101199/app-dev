'use client';

type GoogleMapProps = {
  lat: number;
  lng: number;
  zoom?: number;
  showMarker?: boolean;
};


export default function GoogleMap({ lat, lng }: GoogleMapProps) {
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={mapUrl}
      ></iframe>
    </div>
  );
}
