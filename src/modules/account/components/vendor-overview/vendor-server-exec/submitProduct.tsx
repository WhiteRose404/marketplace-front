"use server"

import { registerProduct } from "../../../../../lib/data/vendor";
import { VendorProduct } from 'types/global';


export default async function submitting(productData: VendorProduct){
    console.log('Submitting product:', JSON.stringify(productData));
    const product = await registerProduct(productData);
    
    if(!product || !product?.length)
        return {
            success: false,
        }
    return {
        success: true,
        product: product
    }
}