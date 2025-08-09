"use client"

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, Heart, Bell, Globe } from 'lucide-react';

// Mock data for demonstration - replace with your actual data
const mockRegions = [
  { name: 'Morocco', code: 'ma', flag: '🇲🇦' },
  { name: 'Tunisia', code: 'tn', flag: '🇹🇳' },
  { name: 'Algeria', code: 'dz', flag: '🇩🇿' }
];

const Nav = ({ 
  cartCount = 0, 
  isLoggedIn = false,
  regions = mockRegions,
  currentRegion = mockRegions[0]
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Shop', href: '/store', isMain: true },
    { name: 'Creators', href: '/creators' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' }
  ];

  const handleSearch = (e: any) => {
    if (e.key === 'Enter' || e.type === 'click') {
      console.log('Search:', searchQuery);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <div className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Left Section - Logo & Main Nav */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <a href="/" className="flex items-center group">
                <div className="relative">
                  <span className="text-2xl font-light text-stone-900 tracking-tight group-hover:text-amber-700 transition-colors">
                    when
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300"></div>
                </div>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      item.isMain 
                        ? 'text-stone-900 hover:bg-stone-50 hover:text-amber-700' 
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Center Section - Search (Desktop) */}
            <div className="hidden lg:block flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  placeholder="Search creators, products..."
                  className="block w-full pl-10 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-2">
              
              {/* Search Button (Mobile) */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Region Selector */}
              <div className="hidden sm:block relative">
                <button
                  onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
                  className="flex items-center space-x-1 p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all"
                >
                  <span className="text-sm">{currentRegion.flag}</span>
                  <Globe className="h-4 w-4" />
                </button>
                
                {isRegionMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50">
                    {regions.map((region) => (
                      <button
                        key={region.code}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                        onClick={() => {
                          setIsRegionMenuOpen(false);
                          // Handle region change
                        }}
                      >
                        <span>{region.flag}</span>
                        <span>{region.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <button className="hidden sm:block p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all relative">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Account */}
              <a 
                href="/account"
                className="hidden sm:block p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all"
              >
                <User className="h-5 w-5" />
              </a>

              {/* Cart */}
              <a 
                href="/cart"
                className="flex items-center space-x-1 px-3 py-2 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all group"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {cartCount > 0 && (
                    <span className="bg-amber-500 text-xs px-1.5 py-0.5 rounded-full ml-1">
                      {cartCount}
                    </span>
                  )}
                </span>
              </a>

              {/* Sell CTA */}
              <a 
                href="/sell"
                className="hidden lg:block px-4 py-2 border border-stone-200 text-stone-700 rounded-xl hover:border-amber-400 hover:text-amber-700 transition-all text-sm font-medium"
              >
                Sell
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4 animate-in slide-in-from-top-2 duration-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  placeholder="Search creators, products..."
                  className="block w-full pl-10 pr-3 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                  autoFocus
                />
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-stone-200">
              <span className="text-xl font-light text-stone-900">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-stone-600 hover:text-stone-900 rounded-xl"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 p-6 space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-2xl font-light text-stone-900 hover:text-amber-700 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-6 border-t border-stone-200 space-y-4">
                <a
                  href="/account"
                  className="flex items-center space-x-3 text-stone-600 hover:text-stone-900 transition-colors py-2"
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </a>
                
                <a
                  href="/wishlist"
                  className="flex items-center space-x-3 text-stone-600 hover:text-stone-900 transition-colors py-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </a>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-6 border-t border-stone-200">
              <a
                href="/sell"
                className="block w-full py-4 bg-stone-900 text-white text-center rounded-xl font-medium hover:bg-stone-800 transition-colors"
              >
                Start Selling
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Click Outside Handler for Region Menu */}
      {isRegionMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsRegionMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Nav;