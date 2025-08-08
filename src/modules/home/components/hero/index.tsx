"use client";

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Star, Shield, Truck, ArrowRight, Mic, Heart } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Featured products for the visual frame
  const featuredProducts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop&crop=center',
      title: 'Handcrafted Leather Bag',
      price: '890 MAD',
      badge: 'Limited'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center',
      title: 'Premium Sneakers',
      price: '1,200 MAD',
      badge: 'Trending'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center',
      title: 'Vintage Watch',
      price: '2,450 MAD',
      badge: 'Exclusive'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop&crop=center',
      title: 'Artisan Jewelry',
      price: '650 MAD',
      badge: 'New'
    }
  ];

  const headlines = [
    "Discover curated treasures from MENA creators",
    "Where authenticity meets modern luxury"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: any) => {
    e.preventDefault();
    // Analytics tracking would go here
    console.log('Search:', searchQuery);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 overflow-hidden">
      {/* Subtle Moroccan pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Dynamic Headlines */}
            <div className="space-y-6">
              <div className="h-32 flex items-center">
                <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight">
                  {headlines.map((headline, index) => (
                    <span
                      key={index}
                      className={`absolute transition-all duration-700 ${
                        currentSlide === index 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                    >
                      {headline}
                    </span>
                  ))}
                </h1>
              </div>
              
              <p className="text-xl text-stone-600 font-light leading-relaxed max-w-lg">
                Shop authentic pieces from independent creators and studios across the MENA region
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5 transition-colors group-focus-within:text-amber-600" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  placeholder="Search unique finds..."
                  className="w-full pl-12 pr-16 py-4 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all text-stone-900 placeholder-stone-500"
                />
                <button
                  onClick={() => console.log('Voice search')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-stone-400 hover:text-amber-600 transition-colors md:hidden"
                  aria-label="Voice search"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-stone-900 text-white px-8 py-4 rounded-2xl hover:bg-stone-800 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                <ShoppingBag className="w-5 h-5" />
                Shop curated
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button className="group border-2 border-stone-200 text-stone-700 px-8 py-4 rounded-2xl hover:border-amber-400 hover:text-amber-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                Sell your items at when
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-6">
              <div className="flex items-center gap-2 text-stone-600">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Secure payments</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Local shipping</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <Star className="w-5 h-5 text-amber-500 fill-current" />
                <span className="text-sm font-medium">Authenticity guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Grid */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="grid grid-cols-2 gap-6">
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className={`group cursor-pointer transition-all duration-500 ${
                    index % 2 === 0 ? 'translate-y-0' : 'translate-y-8'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Product Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-stone-700 text-xs px-3 py-1 rounded-full font-medium">
                        {product.badge}
                      </span>
                    </div>

                    {/* Heart Icon */}
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                      <Heart className="w-4 h-4 text-stone-600 hover:text-red-500 transition-colors" />
                    </button>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-medium text-stone-900 mb-1 group-hover:text-amber-700 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-stone-600 font-semibold">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-stone-200/30 to-amber-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Bottom Section - Quick Stats */}
        <div className="pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl">
            <div className="text-center">
              <div className="text-2xl font-light text-stone-900 mb-1">500+</div>
              <div className="text-sm text-stone-600">Curated creators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-stone-900 mb-1">5,000+</div>
              <div className="text-sm text-stone-600">Unique pieces</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-stone-900 mb-1">24h</div>
              <div className="text-sm text-stone-600">Fast delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA Bar - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-stone-200 p-4 md:hidden z-50">
        <div className="flex gap-3">
          <button className="flex-1 bg-stone-900 text-white py-3 rounded-xl font-medium">
            Shop now
          </button>
          <button className="px-6 border-2 border-stone-200 text-stone-700 py-3 rounded-xl">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;