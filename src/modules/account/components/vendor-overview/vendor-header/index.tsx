"use client";

import React, { useState, useEffect } from 'react';
import {
  Star,
  Plus,
} from 'lucide-react';
import ProductCreationForm from "@modules/account/components/vendor-add-product"

const VendorHeader = ({ vendorData, selectedPeriod, handleSubmit, namedCategories }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isProductCreatingOpen, setIsProductCreatingOpen] = useState(false);

    useEffect(() => {
        setIsVisible(true)
    });
    return (
        <>
            <ProductCreationForm
                isOpen={isProductCreatingOpen}
                onClose={() => setIsProductCreatingOpen(false)}
                onSubmit={handleSubmit}
                namedCategories={namedCategories}
            />
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                {/* Vendor Profile */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                    <img
                        src={vendorData.vendor.logo || `https://ui-avatars.com/api/?name=${vendorData.vendor.name}`}
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
                        // onChange={(e) => setSelectedPeriod(e.target.value)} // todo perhaps handle in the params is better than having a state
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
        </>
    )
}

export default VendorHeader;