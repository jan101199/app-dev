'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically load LeafletMap to avoid SSR issues
const LeafletMap = dynamic(() => import('../../../components/LeafletMap'), { ssr: false });

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export default function UserProfile() {
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return <div className="text-center text-gray-500 text-lg">Loading...</div>;
  }

  if (error || !user) {
    return <div className="text-center text-red-500 text-lg">{error || 'User not found'}</div>;
  }

  return (
    <div className="p-8 w-[85%] mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Leaflet Map showing the user's location */}
        <div className="w-full lg:w-[400px] h-96 mt-6 lg:mt-0 rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <LeafletMap
            lat={parseFloat(user.address.geo.lat)}
            lng={parseFloat(user.address.geo.lng)}
            zoom={20} // Zoom level
            showMarker={true} // Show a marker on the user's location
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{user.name}</h1>
          <p className="text-lg text-gray-600 mb-6">@{user.username}</p>

          <div className="space-y-4 text-gray-700 mb-6">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p>
              <span className="font-semibold">Website:</span>{' '}
              <a
                href={`https://${user.website}`}
                target="_blank"
                className="text-blue-500 hover:underline transition-colors"
              >
                {user.website}
              </a>
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Address:</h2>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
