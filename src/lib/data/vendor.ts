"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
} from "./cookies"
import { Vendor, VendorAdmin, Orders } from "types/global"

export const retrieveVendorAdmin =
  async (): Promise<VendorAdmin | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    const headers = {
      ...authHeaders,
    }

    const next = {
      ...(await getCacheOptions("vendors")),
    }

    return await sdk.client
      .fetch<{ vendor: VendorAdmin }>(`/vendors/me`, {
        method: "GET",
        query: {
          fields: "*orders",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ vendor }) => vendor)
      .catch(() => null)
  }

export const retrieveVendor =
  async (): Promise<Vendor | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    const headers = {
      ...authHeaders,
    }

    const next = {
      ...(await getCacheOptions("vendors")),
    }

    return await sdk.client
      .fetch<{ vendor: Vendor }>(`/vendors/vendor`, {
        method: "GET",
        query: {
          fields: "*orders",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ vendor }) => vendor)
      .catch(() => null)
  }

export const retrieveOrders =
  async (): Promise<Orders[] | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    const headers = {
      ...authHeaders,
    }

    const next = {
      ...(await getCacheOptions("vendors")),
    }

    return await sdk.client
      .fetch<{ orders: Orders[] }>(`/vendors/orders`, {
        method: "GET",
        query: {
          fields: "*items",
        },
        headers,
        next,
        cache: "force-cache",
      })
      .then(({ orders }) => orders)
      .catch(() => null)
  }

// export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   const updateRes = await sdk.store.vendor
//     .update(body, {}, headers)
//     .then(({ vendor }) => vendor)
//     .catch(medusaError)

//   const cacheTag = await getCacheTag("vendors")
//   revalidateTag(cacheTag)

//   return updateRes
// }

// export async function signup(_currentState: unknown, formData: FormData) {
//   const password = formData.get("password") as string
//   const vendorForm = {
//     email: formData.get("email") as string,
//     firstName: formData.get("firstName") as string,
//     lastName: formData.get("lastName") as string,
//     phone: formData.get("phone") as string,
//     category: formData.get("category") as string,
//     city: formData.get("city") as string,
//     storeName: formData.get("storeName") as string
//   }

//   try {
//     const token = await sdk.auth.register("vendor", "emailpass", {
//       email: vendorForm.email,
//       password: password,
//     })

//     await setAuthToken(token as string)

//     const headers = {
//       ...(await getAuthHeaders()),
//     }

//     const { vendor: createdCustomer } = await sdk.store.vendor.create(
//       vendorForm,
//       {},
//       headers
//     )

//     const loginToken = await sdk.auth.login("vendor", "emailpass", {
//       email: vendorForm.email,
//       password,
//     })

//     await setAuthToken(loginToken as string)

//     const vendorCacheTag = await getCacheTag("vendors")
//     revalidateTag(vendorCacheTag)

//     await transferCart()

//     return createdCustomer
//   } catch (error: any) {
//     return error.toString()
//   }
// }

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await sdk.auth
      .login("vendor", "emailpass", { email, password })
      .then(async (token) => {
        await setAuthToken(token as string)
        const vendorCacheTag = await getCacheTag("vendors")
        revalidateTag(vendorCacheTag)
      })
  } catch (error: any) {
    return error.toString()
  }

  try {
    await transferCart()
  } catch (error: any) {
    return error.toString()
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()

  await removeAuthToken()

  const vendorCacheTag = await getCacheTag("vendors")
  revalidateTag(vendorCacheTag)

  await removeCartId()

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)

  redirect(`/${countryCode}/vendor`)
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}

// export const addCustomerAddress = async (
//   currentState: Record<string, unknown>,
//   formData: FormData
// ): Promise<any> => {
//   const isDefaultBilling = (currentState.isDefaultBilling as boolean) || false
//   const isDefaultShipping = (currentState.isDefaultShipping as boolean) || false

//   const address = {
//     first_name: formData.get("first_name") as string,
//     last_name: formData.get("last_name") as string,
//     company: formData.get("company") as string,
//     address_1: formData.get("address_1") as string,
//     address_2: formData.get("address_2") as string,
//     city: formData.get("city") as string,
//     postal_code: formData.get("postal_code") as string,
//     province: formData.get("province") as string,
//     country_code: formData.get("country_code") as string,
//     phone: formData.get("phone") as string,
//     is_default_billing: isDefaultBilling,
//     is_default_shipping: isDefaultShipping,
//   }

//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   return sdk.store.vendor
//     .createAddress(address, {}, headers)
//     .then(async ({ vendor }) => {
//       const vendorCacheTag = await getCacheTag("vendors")
//       revalidateTag(vendorCacheTag)
//       return { success: true, error: null }
//     })
//     .catch((err) => {
//       return { success: false, error: err.toString() }
//     })
// }

// export const deleteCustomerAddress = async (
//   addressId: string
// ): Promise<void> => {
//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   await sdk.store.vendor
//     .deleteAddress(addressId, headers)
//     .then(async () => {
//       const vendorCacheTag = await getCacheTag("vendors")
//       revalidateTag(vendorCacheTag)
//       return { success: true, error: null }
//     })
//     .catch((err) => {
//       return { success: false, error: err.toString() }
//     })
// }

// export const updateCustomerAddress = async (
//   currentState: Record<string, unknown>,
//   formData: FormData
// ): Promise<any> => {
//   const addressId =
//     (currentState.addressId as string) || (formData.get("addressId") as string)

//   if (!addressId) {
//     return { success: false, error: "Address ID is required" }
//   }

//   const address = {
//     first_name: formData.get("first_name") as string,
//     last_name: formData.get("last_name") as string,
//     company: formData.get("company") as string,
//     address_1: formData.get("address_1") as string,
//     address_2: formData.get("address_2") as string,
//     city: formData.get("city") as string,
//     postal_code: formData.get("postal_code") as string,
//     province: formData.get("province") as string,
//     country_code: formData.get("country_code") as string,
//   } as HttpTypes.StoreUpdateCustomerAddress

//   const phone = formData.get("phone") as string

//   if (phone) {
//     address.phone = phone
//   }

//   const headers = {
//     ...(await getAuthHeaders()),
//   }

//   return sdk.store.vendor
//     .updateAddress(addressId, address, {}, headers)
//     .then(async () => {
//       const vendorCacheTag = await getCacheTag("vendors")
//       revalidateTag(vendorCacheTag)
//       return { success: true, error: null }
//     })
//     .catch((err) => {
//       return { success: false, error: err.toString() }
//     })
// }
