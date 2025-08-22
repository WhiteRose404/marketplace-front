"use client";

import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, MapPin, Calendar, Users, Filter, Grid3X3, List, Search, Share2, MessageCircle } from 'lucide-react';


// Todo: change img to next Image component for optimization


const VendorStorePage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [isFollowing, setIsFollowing] = useState(false);

  const vendor = {
    id: 'atlas-artisans',
    name: 'Atlas Artisans',
    tagline: 'Authentic Berber craftsmanship from the Atlas Mountains',
    description: 'We are a collective of skilled artisans from the Atlas Mountains, preserving centuries-old traditions while creating contemporary pieces. Each item tells the story of our heritage through intricate geometric patterns and natural materials sourced locally.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&crop=center',
    location: 'Atlas Mountains, Morocco',
    joinedDate: 'January 2023',
    totalProducts: 42,
    followers: 1234,
    rating: 4.8,
    totalReviews: 127,
    responseTime: '< 2 hours',
    badges: ['Verified Creator', 'Top Seller', 'Eco-Friendly'],
    socialProof: {
      featuredIn: ['Vogue Arabia', 'Morocco Today', 'Craft Magazine'],
      certifications: ['Fair Trade', 'Handmade Guarantee']
    }
  };

  const categories = ['All', 'Carpets & Rugs', 'Home Decor', 'Textiles', 'Pottery', 'Jewelry'];

  const products = [
    {
      id: 1,
      name: 'Handwoven Berber Carpet',
      price: 2890,
      originalPrice: 3200,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop&crop=center',
      rating: 4.9,
      reviews: 23,
      category: 'Carpets & Rugs',
      tags: ['Limited Edition', 'Bestseller'],
      isFavorited: false
    },
    {
      id: 2,
      name: 'Traditional Kilim Runner',
      price: 1450,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center',
      rating: 4.7,
      reviews: 18,
      category: 'Carpets & Rugs',
      tags: ['New'],
      isFavorited: true
    },
    {
      id: 3,
      name: 'Ceramic Tagine Set',
      price: 450,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
      rating: 4.8,
      reviews: 31,
      category: 'Pottery',
      tags: ['Trending'],
      isFavorited: false
    },
    {
      id: 4,
      name: 'Woven Storage Baskets',
      price: 320,
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop&crop=center',
      rating: 4.6,
      reviews: 15,
      category: 'Home Decor',
      tags: ['Eco-Friendly'],
      isFavorited: false
    },
    {
      id: 5,
      name: 'Embroidered Cushion Covers',
      price: 180,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&crop=center',
      rating: 4.9,
      reviews: 42,
      category: 'Textiles',
      tags: ['Popular'],
      isFavorited: false
    },
    {
      id: 6,
      name: 'Silver Berber Jewelry',
      price: 890,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
      rating: 4.8,
      reviews: 28,
      category: 'Jewelry',
      tags: ['Exclusive'],
      isFavorited: false
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Amina Hassan',
      rating: 5,
      comment: 'Beautiful craftsmanship! The carpet arrived exactly as described and the quality exceeded my expectations.',
      date: '2 days ago',
      verified: true
    },
    {
      id: 2,
      name: 'Youssef El Alami',
      rating: 5,
      comment: 'Exceptional service and authentic products. Atlas Artisans preserves the true spirit of Moroccan craftsmanship.',
      date: '1 week ago',
      verified: true
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Store Header */}
      <div className="relative">
        <div 
          className="h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${vendor.coverImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="max-w-7xl mx-auto px-8">
          <div className="relative -mt-20 flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="relative">
              <img
                src={vendor.avatar}
                alt={vendor.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{vendor.name}</h1>
                    {vendor.badges.map((badge, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg text-gray-600 mb-3">{vendor.tagline}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{vendor.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {vendor.joinedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{vendor.followers.toLocaleString()} followers</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{vendor.rating}</span>
                      </div>
                      <span className="text-gray-500">({vendor.totalReviews} reviews)</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Responds within:</span>
                      <span className="font-medium ml-1">{vendor.responseTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      isFollowing 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Contact
                  </button>
                  <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Store Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{vendor.totalProducts}</div>
            <div className="text-gray-600">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{vendor.followers.toLocaleString()}</div>
            <div className="text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{vendor.rating}</div>
            <div className="text-gray-600">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">2.5K</div>
            <div className="text-gray-600">Total Sales</div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About {vendor.name}</h2>
          <p className="text-gray-600 leading-relaxed max-w-4xl">{vendor.description}</p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Featured In</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.socialProof.featuredIn.map((publication, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {publication}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.socialProof.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              >
                <option value="Featured">Featured</option>
                <option value="Newest">Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Most Popular">Most Popular</option>
              </select>
              
              <div className="flex border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={`group cursor-pointer ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                <div className={`relative overflow-hidden rounded-lg bg-gray-100 ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'} mb-4`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.tags.map((tag, index) => (
                        <span key={index} className={`px-2 py-1 text-xs rounded-full ${
                          tag === 'Limited Edition' ? 'bg-red-500 text-white' :
                          tag === 'Bestseller' ? 'bg-yellow-500 text-white' :
                          tag === 'New' ? 'bg-blue-500 text-white' :
                          tag === 'Trending' ? 'bg-purple-500 text-white' :
                          'bg-gray-900 text-white'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Heart className={`w-4 h-4 ${product.isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium text-gray-900 group-hover:underline">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-gray-900">{product.price.toLocaleString()} MAD</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice.toLocaleString()} MAD</span>
                    )}
                  </div>
                  {viewMode === 'list' && (
                    <button className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {testimonials.map((review) => (
              <div key={review.id} className="border border-gray-100 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-medium">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{review.name}</h4>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default VendorStorePage;