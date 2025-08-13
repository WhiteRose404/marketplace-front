"use client";


import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  Eye,
  Star,
  DollarSign,
  Settings,
  Plus,
  MessageSquare,
} from 'lucide-react';
import ProductCreationForm from "@modules/account/components/vendor-add-product"
import RecentEvents from '../vendor-recent-events';
import MetricCard from '../vendor-metrics';

import { getTheEventTime, getThePreviousEventTime } from "../../../../lib/util/vendor-event-time";

import { OrderItem, ProductItem, ReviewItem, VendorAdmin, Vendor, Orders } from 'types/global';
import { HttpTypes } from '@medusajs/types';
import { getProductPrice } from '@lib/util/get-product-price';
import VendorHeader from '../vendor-header';

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
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isVisible, setIsVisible] = useState(false);
  const [isProductCreatingOpen, setIsProductCreatingOpen] = useState(false);

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

  const transformedOrders: OrderItem[] | undefined = vendorOrders?.map(order => ({
    id: order.id,
    type: 'order' as const,
    customer: order.customer,
    product: order.product,
    amount: order.amount,
    status: order.status,
    date: order.date,
    image: order.image
  }));


  // Example product data
  const recentProducts: ProductItem[] | undefined = vendorProducts?.map(product => ({
    id: product.id,
    type: 'product' as const,
    name: product.title,
    category: product.categories,
    price: getProductPrice({ product }) !== null ? getProductPrice({ product }).cheapestPrice().calculated_price : 0,
    stock: product.variants ? product.variants.reduce((acc, variant) => acc + (variant.inventory_quantity ? variant.inventory_quantity: 0), 0) : 0,
    status: product.status === 'published' ? 'active' : 'draft',
    date: new Date(product.created_at ? product.created_at : "").toISOString().split('T')[0],
    image: product.thumbnail ? product.thumbnail : (product.images && product.images.length > 0) ? product.images[0] : "https://via.placeholder.com/60"
  }))

  // Example review data
  const recentReviews: ReviewItem[] | undefined = [
    {
      id: "REV-001",
      type: 'review' as const,
      customer: "Amina Benali",
      product: "Ceramic Tagine Set",
      rating: 5,
      comment: "Beautiful craftsmanship, exactly as described!",
      status: 'new',
      date: "2025-08-11",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop"
    },
    // ... more reviews
  ];
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Amina Benali",
      product: "Handwoven Berber Carpet",
      amount: "2,890 MAD",
      status: "completed",
      date: "2025-08-11",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=60&h=60&fit=crop"
    },
    {
      id: "ORD-002",
      customer: "Youssef Ahmed",
      product: "Ceramic Tagine Set",
      amount: "650 MAD",
      status: "processing",
      date: "2025-08-10",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop"
    },
    {
      id: "ORD-003",
      customer: "Fatima Zahra",
      product: "Silver Jewelry Collection",
      amount: "1,200 MAD",
      status: "shipped",
      date: "2025-08-09",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=60&h=60&fit=crop"
    },
    {
      id: "ORD-004",
      customer: "Hassan Idrissi",
      product: "Leather Messenger Bag",
      amount: "890 MAD",
      status: "pending",
      date: "2025-08-09",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop"
    }
  ];

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

  const notifications = [
    {
      type: "order",
      title: "New order received",
      message: "Amina Benali ordered Handwoven Berber Carpet",
      time: "2 hours ago",
      unread: true
    },
    {
      type: "review",
      title: "New 5-star review",
      message: "\"Beautiful craftsmanship, exactly as described!\"",
      time: "4 hours ago",
      unread: true
    },
    {
      type: "stock",
      title: "Low stock alert",
      message: "Ceramic Tagine Set has only 2 units left",
      time: "6 hours ago",
      unread: false
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);





  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <VendorHeader handleSubmit={handleSubmit} vendorData={vendorData}  />

        {/* Metrics Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <MetricCard
            title="Total Revenue"
            value={analytics.revenue.current}
            change={analytics.revenue.change}
            icon={DollarSign}
            suffix=" MAD"
          />
          <MetricCard
            title="Orders"
            value={analytics.orders.current}
            change={analytics.orders.change}
            icon={ShoppingCart}
          />
          <MetricCard
            title="Store Visitors"
            value={analytics.visitors.current}
            change={analytics.visitors.change}
            icon={Users}
          />
          <MetricCard
            title="Active Products"
            value={analytics.products.active}
            change={analytics.products.current === 0 ? 0 : (analytics.products.current - analytics.products.draft) / analytics.products.current * 100}
            icon={Package}
          />
          <MetricCard
            title="Conversion Rate"
            value={analytics.conversion.current}
            change={analytics.conversion.change}
            icon={TrendingUp}
            suffix="%"
          />
        </div>

        {/* Main Content Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Recent Orders */}
          {/* <RecentEvents
            title="Recent Orders"
            items={transformedOrders}
            onViewAll={() => console.log('View all orders')}
            maxItems={5}
          /> */}
          <RecentEvents
            title="Recent Products"
            items={recentProducts}
            onViewAll={() => console.log('View all products')}
            maxItems={3}
          />

          {/* <RecentEvents
            title="Recent Reviews"
            items={recentReviews}
            onViewAll={() => console.log('View all reviews')}
            showFilter={false}
            maxItems={4}
          /> */}

          {/* Notifications & Quick Stats */}
          <div className="space-y-6">

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-stone-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-stone-900">Notifications</h2>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {notifications.slice(0, 3).map((notification, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${notification.unread ? 'bg-amber-50 border border-amber-100' : 'hover:bg-stone-50'
                    }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                      notification.type === 'review' ? 'bg-green-100 text-green-600' :
                        'bg-amber-100 text-amber-600'
                      }`}>
                      {notification.type === 'order' && <ShoppingCart className="w-4 h-4" />}
                      {notification.type === 'review' && <Star className="w-4 h-4" />}
                      {notification.type === 'stock' && <Package className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 text-sm">{notification.title}</p>
                      <p className="text-stone-600 text-sm truncate">{notification.message}</p>
                      <p className="text-stone-400 text-xs mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-sm text-amber-600 hover:text-amber-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-stone-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors text-center">
                  <Plus className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-stone-900">Add Product</span>
                </button>
                <button className="p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors text-center">
                  <Eye className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-stone-900">View Store</span>
                </button>
                <button className="p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors text-center">
                  <MessageSquare className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-stone-900">Messages</span>
                </button>
                <button className="p-4 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors text-center">
                  <Settings className="w-6 h-6 text-stone-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-stone-900">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>

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