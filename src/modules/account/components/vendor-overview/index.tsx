"use client";


import React, { useState, useEffect } from 'react';
import Metrics from './vendor-metrics';

import { getTheEventTime, getThePreviousEventTime } from "../../../../lib/util/vendor-event-time";

import { VendorAdmin, Vendor, Orders } from 'types/global';
import { HttpTypes } from '@medusajs/types';
import VendorHeader from './vendor-header';
import MainContent from './vendor-main-content';

type VendorProduct = {
  title: string,
  description: string,
  category: string,
  images: string[],
  options: { title: string, values: string[] }[],
  variants: {
    title: string,
    prices: { currency_code: string, amount: string }[],
    manage_inventory: boolean,
    options: any,
    sku: string,
    inventory: string
  }[]
}

const VendorOverview = ({ vendor, vendorAdmin, vendorOrders, namedCategories, vendorProducts }: { vendor: Vendor, vendorAdmin: VendorAdmin, vendorOrders: Orders[] | null, namedCategories: string[], vendorProducts: HttpTypes.StoreProduct[] | null }) => {
  const selectedPeriod = '7d';
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (productData: VendorProduct) => {
    console.log('Submitting product:', productData);
    // Here you would make your API call
    // await fetch('/api/products', { method: 'POST', body: JSON.stringify(productData) })

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  };


  // get the order data
  const currentOrderData: any[] | undefined = getTheEventTime(vendorOrders, "7d");
  const previousOrderData: any[] | undefined = getThePreviousEventTime(vendorOrders, "7d");

  // get the revenu
  const currentRevenuStrem = currentOrderData?.reduce((order) => order.price, 0);
  const previousRevenuStrem = previousOrderData?.reduce((order) => order.price, 0);

  // Mock vendor data - replace with your actual data
  const vendorData = {
    mock: {
      id: "01K22FDVXWXR466K5XSDA9XT7Y",
      first_name: "test0002",
      last_name: "test0002",
      email: "test0002@when.ma",
      vendor_id: "01K22FDVTVG7XV2013DZFARNDT",
      store_name: "Atlas Artisans",
      store_description: "Handcrafted treasures from the Atlas Mountains",
      location: "Marrakech, Morocco",
      category: "Handmade Crafts",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      total_reviews: 127,
      verified: true,
      created_at: "2025-08-07T14:37:12.509Z",
      updated_at: "2025-08-07T14:37:12.509Z"
    },
    vendor, vendorAdmin
  };

  const analytics = {
    revenue: {
      current: currentRevenuStrem,
      previous: previousRevenuStrem,
      change: previousRevenuStrem === 0 ? 0 : (currentRevenuStrem - previousRevenuStrem) / previousRevenuStrem,
      currency: 'MAD'
    },
    orders: {
      current: currentOrderData?.length,
      previous: previousOrderData?.length,
      change: (currentOrderData || currentOrderData?.length === 0 ) ? 0 : ( ( previousOrderData || previousOrderData?.length === 0) ? currentOrderData?.length : (currentOrderData?.length-previousOrderData?.length) / previousOrderData?.length) 
    },
    visitors: {
      current: vendor.vistors, // to do fetch vistors from the vendor itself
      previous: 0, 
      change: 0 // the same rule
    },
    products: {
      current: vendorProducts?.length || 0, // also fetch product and apply that
      active: vendorProducts?.filter(product => product.status === 'published').length || 0,
      draft: vendorProducts?.filter(product => product.status === 'draft').length || 0,
      // outOfStock: vendorProducts?.filter(product => product.status === 'rejected').length || 0,
    },
    conversion: {
      current: 3.2, // stored in the vendor double state or calculated from 
      previous: 2.8,
      change: 14.3
    }
  };


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


  useEffect(() => {
    setIsVisible(true);
  }, []);





  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <VendorHeader handleSubmit={handleSubmit} vendorData={vendorData} namedCategories={namedCategories} selectedPeriod={selectedPeriod} />

        {/* Metrics Grid */}
        <Metrics 
          analytics={analytics}
        />

        {/* Main Content Grid */}
        <MainContent vendorOrders={vendorOrders} vendorProducts={vendorProducts} />

        {/* Top Products */}
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
                  <img
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
      </div>
    </div>
  );
};

export default VendorOverview;