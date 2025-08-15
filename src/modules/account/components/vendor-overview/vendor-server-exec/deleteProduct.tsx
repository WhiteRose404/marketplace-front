"use server"

import { StoreProduct } from "@medusajs/types";
import { deleteVendorProduct } from "../../../../../lib/data/vendor";
import { VendorProduct } from 'types/global';



export default async function deleting(productData: string[]){
    console.log('Deleting product:', productData);
    const product: { success: boolean, error?: string | null} = await deleteVendorProduct(productData);

    return product
}

