'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please fill in both fields.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (cleanEmail === 'admin@admin.com' && cleanPassword === 'admin123') {
      const adminUser = {
        id: 0,
        name: 'Admin',
        email: 'admin@admin.com',
        isAdmin: true,
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setTimeout(() => {
        router.push('/posts');
      }, 100);
      return;
    }

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await res.json();
      const user = users.find((u: any) => u.email.toLowerCase() === cleanEmail);

      if (user && cleanPassword === user.username) {
        localStorage.setItem('user', JSON.stringify({ ...user, isAdmin: false }));
        router.push('/myposts');
      } else {
        setError('Invalid credentials. Use your email as username and your username as password.');
      }
    } catch {
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (

      <div className="w-full m-auto max-w-md bg-white rounded-xl shadow-lg p-8 sm:p-12">
        <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">Sign in</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 text-black py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-600">Dont Have Account Yet?</span>{' '}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">Register</a>
        </div>
      </div>
  );
}
