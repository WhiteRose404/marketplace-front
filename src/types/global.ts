import { StorePrice } from "@medusajs/types"

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type VariantPrice = {
  calculated_price_number: number
  calculated_price: string
  original_price_number: number
  original_price: string
  currency_code: string
  price_type: string
  percentage_diff: string
}

export type StoreFreeShippingPrice = StorePrice & {
  target_reached: boolean
  target_remaining: number
  remaining_percentage: number
}

type prebuilt = {
    id:         string
    created_at: string
    updated_at: string
    deleted_at: string | null
}


export type VendorAdmin = prebuilt & {
    email:      string
    first_name: string
    last_name:  string
    vendor_id:  string
}

export type Vendor = prebuilt & {
    handle: string
    logo:   string | null
    name:   string
    vistors: number
}

export type Orders = any
export type CustomeProducts = any

interface BaseItem {
  id: string;
  image?: string;
  date: string;
}

// Order-specific fields
export interface OrderItem extends BaseItem {
  type: 'order';
  customer: string;
  product: string;
  amount: string;
  status: 'completed' | 'processing' | 'shipped' | 'pending' | 'cancelled';
}

export interface ProductItem extends BaseItem {
  type: 'product';
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'active' | 'draft' | 'out_of_stock' | 'archived';
}

// Review-specific fields (example of future extension)
export interface ReviewItem extends BaseItem {
  type: 'review';
  customer: string;
  product: string;
  rating: number;
  comment: string;
  status: 'new' | 'responded' | 'flagged';
}

// Union type for all possible items
export type EventItem = OrderItem | ProductItem | ReviewItem;

export interface RecentEventsProps {
  title: string;
  items: EventItem[];
  onViewAll?: () => void;
  showFilter?: boolean;
  maxItems?: number;
}