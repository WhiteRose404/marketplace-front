import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { setShippingMethod, initiatePaymentSession } from "@lib/data/cart"


import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import Default from "@modules/checkout/components/default"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "");

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  // set shipping address
  // await setShippingMethod({ cartId: cart.id, shippingMethodId: shippingMethods[0].id })
  //   .catch((err) => {
  //     // setShippingMethodId(currentId)

  //     // setError(err.message)
  //   })
  //   .finally(() => {
  //     // setIsLoading(false)
  //   })

  // // set payment method
  // await initiatePaymentSession(cart, {
  //   provider_id: paymentMethods[0].id,
  // })

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />
      {/* <Default cart={cart} availablePaymentMethods={paymentMethods} availableShippingMethods={shippingMethods}/> */}
      <Shipping cart={cart} availableShippingMethods={shippingMethods} />

      <Payment cart={cart} availablePaymentMethods={paymentMethods} />

      <Review cart={cart} />
    </div>
  )
}
