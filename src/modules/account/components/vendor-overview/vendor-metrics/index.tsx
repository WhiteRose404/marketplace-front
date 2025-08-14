"use client"

import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
} from 'lucide-react';

import MetricCard from './metric';



const Metrics = ({ analytics }: any) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(()=>{
        setIsVisible(true);
    })
    return (
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
                value={analytics.orders.current || 0}
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
    )
}


export default Metrics;