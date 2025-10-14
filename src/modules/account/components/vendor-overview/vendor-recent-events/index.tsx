import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { 
  Filter, 
  MoreHorizontal, 
  CheckCircle, 
  Clock, 
  Package, 
  AlertTriangle, 
  XCircle,
  Star,
  Eye,
  TrendingUp,
  User,
  Edit,
  Trash2,
  EyeOff
} from 'lucide-react';
import { HttpTypes } from '@medusajs/types';

// Base interface that all item types must implement
interface BaseItem {
  id: string;
  image?: string;
  date: string;
}

// Order-specific fields
interface OrderItem extends BaseItem {
  type: 'order';
  customer: string;
  product: string;
  amount: string;
  status: 'completed' | 'processing' | 'shipped' | 'pending' | 'cancelled';
}

// Product-specific fields
interface ProductItem extends BaseItem {
  type: 'product';
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'active' | 'draft' | 'out_of_stock' | 'archived';
}

// Review-specific fields (example of future extension)
interface ReviewItem extends BaseItem {
  type: 'review';
  customer: string;
  product: string;
  rating: number;
  comment: string;
  status: 'new' | 'responded' | 'flagged';
}

// Union type for all possible items
type EventItem = OrderItem | ProductItem | ReviewItem;

interface RecentEventsProps {
  title: string;
  items: EventItem[] | undefined;
  onViewAll?: () => void;
  showFilter?: boolean;
  maxItems?: number;
  onProductModify?: (productId: string) => void;
  onProductDelete?: (productId: string[]) => Promise<void>;
  onProductHide?: (productId: string) => void;
}

const RecentEvents: React.FC<RecentEventsProps> = ({ 
  title, 
  items, 
  onViewAll,
  showFilter = true,
  maxItems = 10,
  onProductModify,
  onProductDelete,
  onProductHide
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const displayItems = items?.slice(0, maxItems);
  const selectedOrderData = selectedOrder ? items?.find(item => item.id === selectedOrder && item.type === 'order') as OrderItem | undefined : null;

  const handleCapturePayment = async (orderId: string) => {
    setIsProcessing(true);
    try {
      // Add your payment capture logic here
      console.log('Capturing payment for order:', orderId);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // After successful payment capture, you might want to update the order status
      alert('Payment captured successfully!');
    } catch (error) {
      console.error('Payment capture failed:', error);
      alert('Failed to capture payment');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderItem['status']) => {
    setIsProcessing(true);
    try {
      // Add your status update logic here
      console.log('Updating order status:', orderId, 'to', newStatus);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Order status updated to ${newStatus}!`);
      // You might want to refresh the items list here
    } catch (error) {
      console.error('Status update failed:', error);
      alert('Failed to update status');
    } finally {
      setIsProcessing(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    console.log("got the following display Items", displayItems)
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (itemId: string) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  const handleProductAction = (action: 'modify' | 'delete' | 'hide', productId: string) => {
    setOpenDropdown(null);
    console.log("got the action", action)
    switch (action) {
      case 'modify':
        onProductModify?.(productId);
        break;
      case 'delete':
        onProductDelete?.([productId]);
        break;
      case 'hide':
        onProductHide?.(productId);
        break;
      default:
        console.log("didn't catch that")
    }
  };

  const getStatusIcon = (status: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      // Order statuses
      completed: <CheckCircle className="w-3 h-3" />,
      processing: <Clock className="w-3 h-3" />,
      shipped: <Package className="w-3 h-3" />,
      pending: <AlertTriangle className="w-3 h-3" />,
      cancelled: <XCircle className="w-3 h-3" />,
      
      // Product statuses
      active: <CheckCircle className="w-3 h-3" />,
      draft: <Clock className="w-3 h-3" />,
      out_of_stock: <XCircle className="w-3 h-3" />,
      archived: <Package className="w-3 h-3" />,
      
      // Review statuses
      new: <Star className="w-3 h-3" />,
      responded: <CheckCircle className="w-3 h-3" />,
      flagged: <AlertTriangle className="w-3 h-3" />,
    };
    
    return iconMap[status] || <Clock className="w-3 h-3" />;
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      // Positive statuses
      completed: 'bg-green-100 text-green-700 border-green-200',
      active: 'bg-green-100 text-green-700 border-green-200',
      responded: 'bg-green-100 text-green-700 border-green-200',
      
      // In-progress statuses
      processing: 'bg-blue-100 text-blue-700 border-blue-200',
      shipped: 'bg-purple-100 text-purple-700 border-purple-200',
      draft: 'bg-blue-100 text-blue-700 border-blue-200',
      
      // Warning statuses
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      new: 'bg-amber-100 text-amber-700 border-amber-200',
      
      // Negative statuses
      cancelled: 'bg-red-100 text-red-700 border-red-200',
      out_of_stock: 'bg-red-100 text-red-700 border-red-200',
      flagged: 'bg-red-100 text-red-700 border-red-200',
      archived: 'bg-stone-100 text-stone-700 border-stone-200',
    };
    
    return colorMap[status] || 'bg-stone-100 text-stone-700 border-stone-200';
  };

  const renderItemContent = (item: EventItem) => {
    const baseImage = (
      <Image
        width={48}
        height={48}
        src={item.image?.trimEnd() || `https://ui-avatars.com/api/?name=${item.id}&background=f5f5f4&color=78716c`}
        alt={getItemAltText(item)}
        className="w-12 h-12 rounded-lg object-cover"
      />
    );

    switch (item.type) {
      case 'order':
        console.log("item on switch", item);
        return (
          <>
            {baseImage}
            <div className="flex-1 min-w-0 cursor-pointer" onClick={()=>{
              setSelectedOrder(item.id);
            }}>
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-stone-900 truncate">{item.customer}</p>
                <span className="text-stone-900 font-semibold">{item.amount}</span>
              </div>
              <p className="text-sm text-stone-600 truncate">{item.product}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
                <span className="text-xs text-stone-500">{item.date}</span>
              </div>
            </div>
          </>
        );

      case 'product':
        return (
          <>
            {baseImage}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-stone-900 truncate">{item.name}</p>
                <span className="text-stone-900 font-semibold">{item.price}</span>
              </div>
              <p className="text-sm text-stone-600 truncate">{item.category}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}
                </span>
                <span className="text-xs text-stone-500">Stock: {item.stock}</span>
                <span className="text-xs text-stone-500">{item.date}</span>
              </div>
            </div>
          </>
        );

      case 'review':
        return (
          <>
            {baseImage}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-stone-900 truncate">{item.customer}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < item.rating ? 'text-amber-400 fill-current' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-stone-600 truncate">{item.product}</p>
              <p className="text-xs text-stone-500 truncate mt-1">"{item.comment}"</p>
              <div className="flex items-center gap-3 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
                <span className="text-xs text-stone-500">{item.date}</span>
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            {baseImage}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-stone-900">Unknown item type</p>
              <p className="text-sm text-stone-600">ID: {item.id}</p>
              <span className="text-xs text-stone-500">{item.date}</span>
            </div>
          </>
        );
    }
  };

  const getItemAltText = (item: EventItem): string => {
    switch (item.type) {
      case 'order':
        return item.product;
      case 'product':
        return item.name;
      case 'review':
        return item.product;
      default:
        return 'Item';
    }
  };

  const renderActionButton = (item: EventItem) => {
    if (item.type === 'product') {
      return (
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => handleDropdownToggle(item.id)}
            className="p-2 text-stone-400 hover:text-stone-600 rounded-lg transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {openDropdown === item.id && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-stone-200 z-50">
              <div className="py-1">
                <button
                  onClick={() => handleProductAction('modify', item.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 w-full text-left transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Modify
                </button>
                <button
                  onClick={() => handleProductAction('delete', item.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={() => handleProductAction('hide', item.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 w-full text-left transition-colors"
                >
                  <EyeOff className="w-4 h-4" />
                  Hide
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  if (!displayItems || displayItems.length === 0) {
    return (
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-stone-100">
          <h2 className="text-lg font-medium text-stone-900">{title}</h2>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-stone-400" />
          </div>
          <p className="text-stone-500">No items to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
      <div className="p-6 border-b border-stone-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-stone-900">{title}</h2>
          <div className="flex items-center gap-2">
            {showFilter && (
              <button className="p-2 text-stone-400 hover:text-stone-600 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            )}
            {onViewAll && (
              <button 
                onClick={onViewAll}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                View all
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {selectedOrder && selectedOrderData ? (
          <div className="space-y-4">
            {/* Back button */}
            <button 
              onClick={() => setSelectedOrder(null)}
              className="text-sm text-stone-600 hover:text-stone-900 flex items-center gap-2 mb-4"
            >
              <span>←</span> Back to orders
            </button>

            {/* Order Details */}
            <div className="bg-stone-50 rounded-xl p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <Image
                  width={80}
                  height={80}
                  src={selectedOrderData.image?.trimEnd() || `https://ui-avatars.com/api/?name=${selectedOrderData.id}&background=f5f5f4&color=78716c`}
                  alt={selectedOrderData.product}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-stone-900 mb-1">{selectedOrderData.customer}</h3>
                  <p className="text-stone-600 mb-2">{selectedOrderData.product}</p>
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedOrderData.status)}`}>
                    {getStatusIcon(selectedOrderData.status)}
                    {selectedOrderData.status.charAt(0).toUpperCase() + selectedOrderData.status.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-stone-900">{selectedOrderData.amount}</p>
                  <p className="text-sm text-stone-500 mt-1">{selectedOrderData.date}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-stone-200"></div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-stone-700 mb-3">Order Actions</h4>
                
                {/* Capture Payment Button */}
                {(selectedOrderData.status === 'pending' || selectedOrderData.status === 'processing') && (
                  <button
                    onClick={() => handleCapturePayment(selectedOrderData.id)}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-stone-300 text-white rounded-lg font-medium transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {isProcessing ? 'Processing...' : 'Capture Payment'}
                  </button>
                )}

                {/* Status Change Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {selectedOrderData.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrderData.id, 'completed')}
                      disabled={isProcessing}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-green-50 border-2 border-green-600 text-green-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Complete
                    </button>
                  )}
                  {selectedOrderData.status !== 'shipped' && selectedOrderData.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrderData.id, 'shipped')}
                      disabled={isProcessing}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-purple-50 border-2 border-purple-600 text-purple-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      <Package className="w-4 h-4" />
                      Ship
                    </button>
                  )}
                  {selectedOrderData.status !== 'processing' && selectedOrderData.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrderData.id, 'processing')}
                      disabled={isProcessing}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-blue-50 border-2 border-blue-600 text-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      <Clock className="w-4 h-4" />
                      Process
                    </button>
                  )}
                  {selectedOrderData.status !== 'cancelled' && selectedOrderData.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusChange(selectedOrderData.id, 'cancelled')}
                      disabled={isProcessing}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-red-50 border-2 border-red-600 text-red-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Order Info */}
              <div className="bg-white rounded-lg p-4 space-y-2">
                <h4 className="text-sm font-medium text-stone-700 mb-3">Order Information</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Order ID:</span>
                  <span className="text-stone-900 font-medium">{selectedOrderData.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Customer:</span>
                  <span className="text-stone-900 font-medium">{selectedOrderData.customer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Product:</span>
                  <span className="text-stone-900 font-medium">{selectedOrderData.product}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Amount:</span>
                  <span className="text-stone-900 font-medium">{selectedOrderData.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Date:</span>
                  <span className="text-stone-900 font-medium">{selectedOrderData.date}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          displayItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-stone-50 rounded-xl transition-colors">
              {renderItemContent(item)}
              {renderActionButton(item)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentEvents;