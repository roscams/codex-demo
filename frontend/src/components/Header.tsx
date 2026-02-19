'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, User } from 'lucide-react';

const navigation = [
  { name: 'Nieuws', href: '/nieuws' },
  { name: 'Sport', href: '/sport' },
  { name: 'Showbizz', href: '/showbizz' },
  { name: 'Binnenland', href: '/binnenland' },
  { name: 'Buitenland', href: '/buitenland' },
  { name: 'Economie', href: '/economie' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/zoeken?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-hln-red text-white py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <span>Het laatste nieuws, altijd en overal</span>
          <Link href="/admin" className="hover:underline flex items-center gap-1">
            <User size={14} />
            Admin
          </Link>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-3xl font-black text-hln-red">HLN</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-hln-red font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and mobile menu */}
          <div className="flex items-center gap-4">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Zoeken..."
                  className="border border-gray-300 rounded-l px-3 py-1 focus:outline-none focus:border-hln-red"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-hln-red text-white px-3 py-1 rounded-r hover:bg-red-600"
                >
                  <Search size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-500 hover:text-hln-red"
              >
                <Search size={24} />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-500 hover:text-hln-red"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-hln-red font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
