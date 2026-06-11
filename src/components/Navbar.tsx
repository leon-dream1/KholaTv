'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiMenu, HiX, HiSearch, HiHome, HiCollection, HiMoon, HiSun } from 'react-icons/hi';
import { preloadAllChannels } from '@/lib/client-channels';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNightMode, setIsNightMode] = useState(true);

  const toggleTheme = () => {
    setIsNightMode(!isNightMode);
    document.documentElement.classList.toggle('light-mode');
  };

  const links = [
    { href: '/', label: 'Home', icon: <HiHome size={18} /> },
    { href: '/all', label: 'All', icon: <HiCollection size={18} /> },
    { href: '/channels/sports', label: 'Sports', icon: '⚽' },
    { href: '/channels/news', label: 'News', icon: '📰' },
    { href: '/countries/bd', label: 'Bangladesh', icon: '🇧🇩' },
  ];

  const mobileNav = [
    { href: '/', label: 'Home', icon: <HiHome size={20} /> },
    { href: '/countries/bd', label: 'BD', icon: <span className="text-lg">🇧🇩</span> },
    { href: '/all', label: 'All', icon: <HiCollection size={20} /> },
    { href: '/channels/sports', label: 'Sports', icon: <span className="text-lg">⚽</span> },
    { href: '/search', label: 'Search', icon: <HiSearch size={20} /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchFocus = () => {
    preloadAllChannels();
  };

  return (
    <>
      <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/30">
                <span className="text-white font-bold text-xs sm:text-sm">K</span>
              </div>
              <span className="text-white font-bold text-base sm:text-xl">Khola TV</span>
            </Link>

            <div className="hidden md:flex items-center gap-0.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-red-600/20 text-red-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  className="w-40 lg:w-56 bg-gray-800 text-white text-sm rounded-lg pl-4 pr-9 py-2 border border-gray-700 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all"
                />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  <HiSearch size={16} />
                </button>
              </div>
            </form>

            <button
              onClick={toggleTheme}
              className="hidden md:flex ml-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors"
              title="Toggle Night Mode"
            >
              {isNightMode ? <HiSun size={20} /> : <HiMoon size={20} />}
            </button>

            <button
              className="md:hidden text-gray-300 hover:text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-900/95 backdrop-blur-md px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-red-600/20 text-red-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <form onSubmit={handleSearch} className="pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  className="w-full bg-gray-800 text-white text-sm rounded-lg pl-4 pr-10 py-2.5 border border-gray-700 focus:outline-none focus:border-red-500"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <HiSearch size={18} />
                </button>
              </div>
            </form>

            <button
              onClick={toggleTheme}
              className="mt-4 w-full flex items-center justify-center gap-2 p-2 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isNightMode ? <><HiSun size={20} /> Switch to Light Mode</> : <><HiMoon size={20} /> Switch to Night Mode</>}
            </button>
          </div>
        )}
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 z-50 pb-1">
        <div className="flex items-center justify-around py-1">
          {mobileNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                pathname === item.href ? 'text-red-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="md:hidden h-14" />
    </>
  );
}
