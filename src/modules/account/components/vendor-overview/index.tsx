"use client";


import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Package, 
  ShoppingCart, 
  Users, 
  Eye,
  Star,
  DollarSign,
  Calendar,
  Bell,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Filter,
  Download,
  Heart,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import ProductCreationForm from "@modules/account/components/vendor-add-product"


import { VendorAdmin } from 'types/global';
import { Vendor } from 'types/global';

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

const VendorOverview = ({ vendor, vendorAdmin, vendorOrders, namedCategories }: { vendor: Vendor, vendorAdmin: VendorAdmin, vendorOrders: any, namedCategories: string[] }) => {
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
      current: 12450,
      previous: 10230,
      change: 21.7,
      currency: 'MAD'
    },
    orders: {
      current: 89,
      previous: 76,
      change: 17.1
    },
    visitors: {
      current: 2847,
      previous: 2156,
      change: 32.1
    },
    products: {
      current: 24,
      active: 21,
      draft: 3,
      outOfStock: 2
    },
    conversion: {
      current: 3.2,
      previous: 2.8,
      change: 14.3
    }
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'processing':
        return <Clock className="w-3 h-3" />;
      case 'shipped':
        return <Package className="w-3 h-3" />;
      case 'pending':
        return <AlertTriangle className="w-3 h-3" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, prefix = "", suffix = "" }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-stone-600" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          change > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-light text-stone-900">
          {prefix}{value.toLocaleString()}{suffix}
        </h3>
        <p className="text-sm text-stone-600">{title}</p>
      </div>
    </div>
  );

  return (
    <>
      <ProductCreationForm
        isOpen={isProductCreatingOpen}
        onClose={() => setIsProductCreatingOpen(false)}
        onSubmit={handleSubmit}
        namedCategories={namedCategories}
      />
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Vendor Profile */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={vendorData.vendor.logo || `https://ui-avatars.com/api/?name=${vendor.name}`}
                    alt={`${vendorData.vendorAdmin.first_name} ${vendorData.vendorAdmin.last_name}`}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  {/* {vendorData.mock.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )} */}
                </div>
                <div>
                  <h1 className="text-2xl font-light text-stone-900">
                    Welcome back, {vendorData.vendorAdmin.first_name}
                  </h1>
                  <p className="text-stone-600 flex items-center gap-2">
                    {vendorData.vendor.name}
                    <span className="flex items-center gap-1 text-amber-600">
                      <Star className="w-4 h-4 fill-current" />
                      {vendorData.mock.rating}
                    </span>
                    <span className="text-stone-400">({vendorData.mock.total_reviews} reviews)</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="3m">Last 3 months</option>
                    <option value="1y">Last year</option>
                  </select>
                  
                  {/* <button className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all">
                    <Download className="w-5 h-5" />
                  </button> */}
                </div>
                
                <button onClick={() => setIsProductCreatingOpen(true)} className="px-4 py-2 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>
            </div>
          </div>

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
              change={15.2}
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
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b border-stone-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-stone-900">Recent Orders</h2>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-stone-400 hover:text-stone-600 rounded-lg transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                      View all
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4 p-4 hover:bg-stone-50 rounded-xl transition-colors">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-stone-900 truncate">{order.customer}</p>
                        <span className="text-stone-900 font-semibold">{order.amount}</span>
                      </div>
                      <p className="text-sm text-stone-600 truncate">{order.product}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <span className="text-xs text-stone-500">{order.date}</span>
                      </div>
                    </div>
                    <button className="p-2 text-stone-400 hover:text-stone-600 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

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
                    <div key={index} className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                      notification.unread ? 'bg-amber-50 border border-amber-100' : 'hover:bg-stone-50'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
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
    </>
  );
};

export default VendorOverview;