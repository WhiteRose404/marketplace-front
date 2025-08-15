"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';




const TopProducts = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);



    const topProducts = [
        {
            name: "Handwoven Berber Carpet",
            sales: 12,
            revenue: "34,680 MAD",
            views: 1204,
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=60&h=60&fit=crop"
        },
        {
            name: "Ceramic Tagine Set",
            sales: 8,
            revenue: "5,200 MAD",
            views: 892,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop"
        },
        {
            name: "Silver Jewelry Collection",
            sales: 15,
            revenue: "18,000 MAD",
            views: 756,
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=60&h=60&fit=crop"
        }
    ];
    return (
        <div className={`bg-white rounded-2xl shadow-sm transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="p-6 border-b border-stone-100">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-stone-900">Top Performing Products</h2>
                    <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                        View analytics
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topProducts.map((product, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl">
                            <Image
                                width={150}
                                height={150}
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-stone-900 text-sm truncate">{product.name}</h3>
                                <div className="flex items-center gap-4 mt-2 text-xs text-stone-600">
                                    <span>{product.sales} sales</span>
                                    <span>{product.views} views</span>
                                </div>
                                <p className="font-semibold text-stone-900 text-sm mt-1">{product.revenue}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default TopProducts;