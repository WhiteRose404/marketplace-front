import React from 'react';


import {
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';


const MetricCard = ({ title, value, change, icon: Icon, prefix = "", suffix = "" }: {
    title: string
    value: number | string
    change: number
    icon: React.ComponentType<{ className?: string }>
    prefix?: string
    suffix?: string
}) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-stone-600" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                {change > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {Math.abs(change)}%
            </div>
        </div>
        <div className="space-y-1">
            <h3 className="text-2xl font-light text-stone-900">
                {prefix}{value}{suffix}
            </h3>
            <p className="text-sm text-stone-600">{title}</p>
        </div>
    </div>
);


export default MetricCard;