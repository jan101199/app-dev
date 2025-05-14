'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    return null;
  }

  const navLinks = (
    <>
      <Link href="/" className="px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300">
        Home
      </Link>
      <Link href="/users" className="px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300">
        Users
      </Link>
      <Link href="/posts" className="px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300">
        Posts
      </Link>
      <Link href="/chart" className="px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300">
        Dashboard
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Logo / Title */}
        <div className="text-lg font-bold text-blue-600 tracking-wide">
          MySocialApp
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4 text-gray-800 font-medium">
          {pathname !== '/myposts' && navLinks}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition duration-300"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
          {pathname !== '/myposts' && navLinks}
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-full transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
