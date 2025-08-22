"use client";

import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';

import RelatedProducts from './product-suggestion';


// Todo: change img to next Image component for optimization


const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('Natural');
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const product = {
    id: 'handwoven-berber-carpet',
    name: 'Handwoven Berber Carpet',
    brand: 'Atlas Artisans',
    price: 2890,
    originalPrice: 3200,
    currency: 'MAD',
    rating: 4.9,
    reviews: 23,
    description: 'Authentic handwoven Berber carpet crafted by skilled artisans in the Atlas Mountains. Each piece tells a unique story through traditional geometric patterns passed down through generations.',
    features: [
      'Hand-knotted wool from Atlas Mountains',
      'Traditional Berber geometric patterns',
      'Natural dyes from local plants',
      'Dimensions: 200cm x 140cm',
      'Thickness: 12mm'
    ],
    variants: [
      { name: 'Natural', color: '#F5F5DC', available: true },
      { name: 'Terracotta', color: '#CD853F', available: true },
      { name: 'Deep Olive', color: '#556B2F', available: false }
    ],
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center'
    ],
    tags: ['Limited Edition', 'Handcrafted', 'Authentic'],
    seller: {
      name: 'Atlas Artisans',
      location: 'Atlas Mountains, Morocco',
      rating: 4.8,
      totalSales: 127
    }
  };

  

  return (
    <div className="min-h-screen bg-white">
      

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Breadcrumb */} 
        {/* TODO: use medusa breadcrumb */}
        <div className="pr-8 py-4 text-sm text-gray-500">
            <span>Shop</span>
            <span className="mx-2">/</span>
            <span>Home & Decor</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Handwoven Berber Carpet</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setIsFavorited(!isFavorited)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              <button className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              {selectedImage > 0 && (
                <button 
                  onClick={() => setSelectedImage(selectedImage - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              {selectedImage < product.images.length - 1 && (
                <button 
                  onClick={() => setSelectedImage(selectedImage + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-gray-900' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex gap-2">
              {product.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Brand & Title */}
            <div>
              <p className="text-gray-600 text-lg">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()} {product.currency}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">{product.originalPrice.toLocaleString()} {product.currency}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Variants */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => variant.available && setSelectedVariant(variant.name)}
                    disabled={!variant.available}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      selectedVariant === variant.name
                        ? 'border-gray-900 bg-gray-50'
                        : variant.available
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-100 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: variant.color }}
                    />
                    <span className="text-sm">{variant.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="w-full border border-gray-900 text-gray-900 py-4 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Buy Now
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Authenticity guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Free shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-600">30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 border-t border-gray-100 pt-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Creator</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{product.seller.name}</h4>
                  <p className="text-gray-600">{product.seller.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.seller.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{product.seller.totalSales} sales</span>
                </div>
                <button className="text-gray-900 font-medium hover:underline">Visit Creator Store</button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts />
      </div>

    </div>
  );
};

export default ProductPage;