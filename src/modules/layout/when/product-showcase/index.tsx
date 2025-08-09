"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Star, Filter, Grid3X3, List, ChevronDown, Eye, ShoppingBag } from 'lucide-react';

const ProductListing = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Mock product data - replace with your Medusa products
  const products = [
    {
      id: 1,
      title: 'Handwoven Berber Carpet',
      creator: 'Atlas Artisans',
      price: '2,890 MAD',
      originalPrice: '3,200 MAD',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=400&fit=crop'
      ],
      badge: 'Limited Edition',
      rating: 4.9,
      reviews: 23,
      description: 'Authentic handwoven carpet crafted by Berber artisans in the High Atlas mountains.',
      category: 'Home & Decor',
      isNew: false,
      inStock: true
    },
    {
      id: 2,
      title: 'Minimalist Ceramic Vase',
      creator: 'Fez Pottery Studio',
      price: '450 MAD',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop'
      ],
      badge: 'Trending',
      rating: 4.7,
      reviews: 15,
      description: 'Contemporary ceramic vase with traditional Moroccan techniques.',
      category: 'Home & Decor',
      isNew: true,
      inStock: true
    },
    {
      id: 3,
      title: 'Leather Crossbody Bag',
      creator: 'Marrakech Leather Co.',
      price: '890 MAD',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop'
      ],
      badge: 'Exclusive',
      rating: 4.8,
      reviews: 31,
      description: 'Premium leather bag handcrafted with traditional Moroccan techniques.',
      category: 'Fashion',
      isNew: false,
      inStock: true
    },
    {
      id: 4,
      title: 'Artisan Silver Jewelry Set',
      creator: 'Essaouira Silversmiths',
      price: '1,200 MAD',
      originalPrice: '1,450 MAD',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop'
      ],
      badge: 'Sale',
      rating: 4.9,
      reviews: 42,
      description: 'Traditional Amazigh-inspired silver jewelry set with contemporary design.',
      category: 'Jewelry',
      isNew: false,
      inStock: true
    },
    {
      id: 5,
      title: 'Organic Argan Oil Skincare',
      creator: 'Desert Rose Beauty',
      price: '320 MAD',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop'
      ],
      badge: 'Natural',
      rating: 4.6,
      reviews: 18,
      description: 'Pure argan oil skincare collection from sustainable Moroccan cooperatives.',
      category: 'Beauty',
      isNew: true,
      inStock: true
    },
    {
      id: 6,
      title: 'Traditional Moroccan Lamp',
      creator: 'Medina Metalworks',
      price: '680 MAD',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop'
      ],
      badge: 'Handmade',
      rating: 4.8,
      reviews: 27,
      description: 'Hand-forged brass lamp with intricate geometric patterns.',
      category: 'Home & Decor',
      isNew: false,
      inStock: false
    }
  ];

  const categories = ['All', 'Fashion', 'Home & Decor', 'Jewelry', 'Beauty'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleLike = (productId: string) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const ProductCard = ({ product } : any) => (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
        
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={hoveredProduct === product.id && product.images[1] ? product.images[1] : product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.badge && (
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                product.badge === 'Sale' ? 'bg-red-100 text-red-700' :
                product.badge === 'New' ? 'bg-green-100 text-green-700' :
                product.badge === 'Limited Edition' ? 'bg-purple-100 text-purple-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {product.badge}
              </span>
            )}
            {product.isNew && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-medium rounded-full">
                New
              </span>
            )}
          </div>

          {/* Actions Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Quick view:', product.id);
                }}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-stone-50 transition-colors"
              >
                <Eye className="w-5 h-5 text-stone-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Add to cart:', product.id);
                }}
                disabled={!product.inStock}
                className="p-3 bg-stone-900 text-white rounded-full shadow-lg hover:bg-stone-800 transition-colors disabled:bg-stone-300"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Heart Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(product.id);
            }}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                likedProducts.has(product.id) 
                  ? 'text-red-500 fill-current' 
                  : 'text-stone-600 hover:text-red-500'
              }`} 
            />
          </button>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="mb-2">
            <p className="text-sm text-stone-500 mb-1">{product.creator}</p>
            <h3 className="font-medium text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="text-sm text-stone-600 ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-stone-400">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-stone-900">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-stone-500 line-through">{product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-4">
          Curated Collections
        </h2>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Discover authentic pieces from talented creators across the MENA region
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-600">
            {filteredProducts.length} products
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
              onClick={() => setSortBy(sortBy === 'featured' ? 'price' : 'featured')}
            >
              Sort: {sortBy === 'featured' ? 'Featured' : 'Price'}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-8 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1 max-w-4xl mx-auto'
      }`}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 border-2 border-stone-200 text-stone-700 rounded-xl hover:border-amber-400 hover:text-amber-700 transition-all font-medium">
          Load more products
        </button>
      </div>

      {/* Trust Section */}
      <div className="mt-16 pt-12 border-t border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="font-medium text-stone-900 mb-2">Authenticity Guaranteed</h3>
            <p className="text-sm text-stone-600">Every piece is verified by our expert team</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="font-medium text-stone-900 mb-2">Fast Local Delivery</h3>
            <p className="text-sm text-stone-600">Free shipping across MENA region</p>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
            </div>
            <h3 className="font-medium text-stone-900 mb-2">Support Local Creators</h3>
            <p className="text-sm text-stone-600">Directly support MENA artisans and designers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;