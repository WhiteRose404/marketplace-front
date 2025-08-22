"use client";

import React from 'react';
import { Star } from 'lucide-react';

const RelatedProducts = () => {
    const relatedProducts = [
        {
            id: 1,
            name: 'Ceramic Tagine Set',
            brand: 'Fez Pottery Studio',
            price: 450,
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center',
            rating: 4.7,
            tag: 'New'
        },
        {
            id: 2,
            name: 'Leather Crossbody Bag',
            brand: 'Marrakech Leather Co.',
            price: 890,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center',
            rating: 4.8,
            tag: 'Exclusive'
        },
        {
            id: 3,
            name: 'Silver Jewelry Set',
            brand: 'Essaouira Silversmiths',
            price: 1200,
            originalPrice: 1450,
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center',
            rating: 4.9,
            tag: 'Sale'
        }
    ];
    return (
        <div className="mt-16 border-t border-gray-100 pt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${item.tag === 'New' ? 'bg-blue-500 text-white' :
                                    item.tag === 'Sale' ? 'bg-red-500 text-white' :
                                        'bg-gray-900 text-white'
                                    }`}>
                                    {item.tag}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <h3 className="font-medium text-gray-900 group-hover:underline">{item.name}</h3>
                            <div className="flex items-center gap-1 mb-2">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-600">{item.rating}</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-semibold text-gray-900">{item.price} MAD</span>
                                {item.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">{item.originalPrice} MAD</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts;