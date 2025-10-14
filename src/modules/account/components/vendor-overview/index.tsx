"use client"

import { useState } from 'react';

import Metrics from './vendor-metrics';
import VendorHeader from './vendor-header';
import MainContent from './vendor-main-content';
import TopProducts from './vendor-top-product';

import { getTheEventTime, getThePreviousEventTime } from "../../../../lib/util/vendor-event-time";

import { VendorAdmin, Vendor, Orders } from 'types/global';
import { HttpTypes } from '@medusajs/types';

import handleProductSubmit from './vendor-server-exec/submitProduct';



type MetricTypes = "products" | "orders" | "conversion" | "vistors" | "revenu";



const VendorOverview = ({ countryCode, vendor, vendorAdmin, vendorOrders, namedCategories, vendorProducts, vendorLocations }: { countryCode: string, vendor: Vendor, vendorAdmin: VendorAdmin, vendorOrders: Orders[] | null, namedCategories: string[], vendorProducts: HttpTypes.StoreProduct[] | null, vendorLocations?: any[] }) => {
  // do a service in the front end that will abstract the fetching, instead of displaying the items passefilly
  
  
  const selectedPeriod = '7d';
  // get the order data
  const currentOrderData: any[] | undefined = getTheEventTime(vendorOrders, "7d");
  const previousOrderData: any[] | undefined = getThePreviousEventTime(vendorOrders, "7d");

  // get the revenu
  const currentRevenuStrem = currentOrderData?.reduce((order) => order.price, 0);
  const previousRevenuStrem = previousOrderData?.reduce((order) => order.price, 0);

  // switch between metrics
  const [currentMetric, setCurrentMetric] = useState<MetricTypes>("products");

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
      change: (!currentOrderData || currentOrderData?.length === 0 ) ? 0 : ( ( !previousOrderData || previousOrderData?.length === 0) ? currentOrderData?.length : (currentOrderData?.length-previousOrderData?.length) / previousOrderData?.length) 
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



  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <VendorHeader 
          handleSubmit={handleProductSubmit} vendorData={vendorData} namedCategories={namedCategories} selectedPeriod={selectedPeriod} vendorLocations={vendorLocations}/>

        {/* Metrics Grid */}
        <Metrics 
          changeMetric={(metric: MetricTypes)=>{
            setCurrentMetric(metric);
          }}
          analytics={analytics}
        />

        {/* Main Content Grid */}
        <MainContent currentMetric={currentMetric} countryCode={countryCode} handleSubmit={handleProductSubmit} vendorOrders={vendorOrders} vendorProducts={vendorProducts} namedCategories={namedCategories} vendorLocations={vendorLocations}/>

        {/* Top Products */}
        <TopProducts />
        
      </div>
    </div>
  );
};

export default VendorOverview;