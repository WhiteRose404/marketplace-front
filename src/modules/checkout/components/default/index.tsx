"use client";

import { useEffect } from "react";
import { setShippingMethod, initiatePaymentSession } from "@lib/data/cart";


import { HttpTypes } from "@medusajs/types";

type DefaultProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
  availablePaymentMethods: any[]
}


export default function ({
  cart,
  availableShippingMethods,
  availablePaymentMethods
}: DefaultProps){
    // set shipping address
    useEffect(()=>{
        const fill = async ()=>{
            await setShippingMethod({ cartId: cart.id, shippingMethodId: availableShippingMethods[0].id })
            .catch((err) => {
                // setShippingMethodId(currentId)

                // setError(err.message)
            })
            .finally(() => {
                // setIsLoading(false)
            })

            // set payment method
            await initiatePaymentSession(cart, {
                provider_id: availablePaymentMethods[0].id,
            })

            console.log("debugging cart still has", cart)
        }
        fill();
    }, []);
    return <></>
}