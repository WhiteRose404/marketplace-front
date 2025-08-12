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
}

export type Orders = prebuilt & {

}