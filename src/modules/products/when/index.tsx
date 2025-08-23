"use client";

import React, { useState } from 'react';
import { Star, Shield, Truck, RotateCcw } from 'lucide-react';

import RelatedProducts from './product-suggestion';
import VendorStats from '../components/vendor-stats';
import Breadcrumb from '@modules/components/breadcrumb';
import { HttpTypes } from '@medusajs/types';
import ProductActions from "@modules/products/components/product-actions"
import ImageGallery from '@modules/products/components/image-gallery';


type ProductTemplateProps = {
  vendorManaged: boolean
  vendor?: string
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const currency_symbols: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  MAD: 'د.م.',
  // Add more currency codes and their symbols as needed
};

const ProductPage: React.FC<ProductTemplateProps> = ({
  vendorManaged,
  vendor,
  product,
  region,
  countryCode,
}) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.id || '');
  const [quantity, setQuantity] = useState(1);

  // Get current variant details
  const currentVariant = product.variants?.find(v => v.id === selectedVariant) || product.variants?.[0];
  const currentPrice = currentVariant?.calculated_price?.calculated_amount || 0;
  const originalPrice = currentVariant?.calculated_price?.original_amount;
  const currency = region?.currency_code?.toUpperCase() || 'MAD';

  // Extract color options
  const colorOption = product.options?.find(opt => opt.title?.toLowerCase() === 'color');
  const availableColors = colorOption ? colorOption.values || [] : [];

  // Generate variant combinations for color selection
  const getVariantForColor = (colorValue: string) => {
    return product.variants?.find(variant => 
      variant.options?.some(opt => opt.value === colorValue)
    );
  };

  // Mock data for missing fields (you can replace with actual data from your backend)
  const mockData = {
    brand: 'Artisan Collective',
    rating: 4.8,
    reviews: 12,
    tags: (product.tags && product.tags.length > 0) ? product.tags.map(tag => tag.value) : ['Handcrafted', 'Limited Edition'],
    features: [
      'Handcrafted with premium materials',
      'Unique design and quality',
      'Sourced from local artisans',
      'Made with sustainable practices'
    ],
    seller: {
      name: 'Local Artisan Studio',
      location: 'Morocco',
      rating: 4.9,
      totalSales: 89
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb tabs={[
          { value: 'Home', href: '/' },
          { value: 'Products', href: '/products' },
          { value: product.title || 'Product', href: `/products/${product.handle}` }
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ImageGallery images={product.images || []} title={product.title} />

          {/* Product Details */}
          <div className="space-y-6">
            {/* Tags */}
            {mockData.tags.length > 0 && (
              <div className="flex gap-2">
                {mockData.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Brand & Title */}
            <div>
              <p className="text-gray-600 text-lg">{mockData.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{mockData.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">({mockData.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {(currentPrice.toFixed(2)).toLocaleString()} {currency_symbols[currency] || currency}
              </span>
              {originalPrice && originalPrice !== currentPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {(originalPrice.toFixed(2)).toLocaleString()} {currency_symbols[currency] || currency}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            )}

            {/* Color Variants */}
            {availableColors.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex gap-3">
                  {availableColors.map((color) => {
                    const variant = getVariantForColor(color.value);
                    const isSelected = selectedVariant === variant?.id;
                    const isAvailable = variant && !variant.manage_inventory || (variant?.inventory_quantity && variant.inventory_quantity > 0);
                    
                    return (
                      <button
                        key={color.id}
                        onClick={() => variant && isAvailable && setSelectedVariant(variant.id)}
                        disabled={!isAvailable}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                          isSelected
                            ? 'border-gray-900 bg-gray-50'
                            : isAvailable
                            ? 'border-gray-200 hover:border-gray-300'
                            : 'border-gray-100 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-200" />
                        <span className="text-sm">{color.value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
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

            {/* Product Actions */}
            <div className="space-y-3">
              <ProductActions 
                product={product}
                region={region}
                disabled={false}
              />
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Authenticity</span>
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
                {mockData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <VendorStats product={{ seller: mockData.seller }} />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductPage;