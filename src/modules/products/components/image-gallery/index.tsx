
"use client";

import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  title: string
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Fallback images for products without images
  const fallbackImages = [
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=center',
  ];

  const productImages = images && images.length > 0
    ? images.map(img => img.url)
    : fallbackImages;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          width={600}
          height={600}
          src={productImages[selectedImage]}
          alt={title || 'Product image'}
          className="w-full h-full object-cover"
          priority
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

        {/* Navigation arrows */}
        {selectedImage > 0 && (
          <button
            onClick={() => setSelectedImage(selectedImage - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        {selectedImage < productImages.length - 1 && (
          <button
            onClick={() => setSelectedImage(selectedImage + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Thumbnail grid */}
      {productImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-gray-900' : 'ring-1 ring-gray-200'
                }`}
            >
              <Image
                width={150}
                height={150}
                src={image}
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
