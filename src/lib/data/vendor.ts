"use server"

import { sdk } from "@lib/config"
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
import { Vendor, VendorAdmin, Orders, VendorProduct } from "types/global"
import { StoreProduct } from "@medusajs/types"




type locationFetched = {
  "locations": [
    {
      "id": string,
      "name": string,
      "address": {
        "address_1": string,
        "address_2": string | null,
        "city": string,
        "country_code": string,
        "postal_code": string | null,
        "phone": string | null,
        "province": string | null
      },
      "created_at": string,
      "updated_at": string
    }
  ],
  "count": number
}

type errorFetched = {
  error: string,
  message: string 
}


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
        // cache: "force-cache",
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
        // cache: "force-cache",
      })
      .then(({ orders }) => orders)
      .catch(() => null)
  }

export const retrieveProducts =
  async (): Promise<StoreProduct[] | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    const headers = {
      ...authHeaders,
    }

    const next = {
      ...(await getCacheOptions("vendor_products")),
    }

    return await sdk.client
      .fetch<{ products: StoreProduct[] }>(`/vendors/products`, {
        method: "GET",
        query: {
          // fields: "*items",
        },
        headers,
        // next,
        // cache: "force-cache",
      })
      .then(({ products }) => products)
      .catch(() => null)
  }

export const registerProduct =
  async (productData: VendorProduct): Promise<StoreProduct[] | null> => {
    const authHeaders = await getAuthHeaders()

    if (!authHeaders) return null

    const headers = {
      ...authHeaders,
    }

    return await sdk.client
      .fetch<{ products: StoreProduct[], inventory_levels: any }>(`/vendors/products`, {
        method: "POST",
        body: productData,
        query: {
          // fields: "*items",
        },
        headers,
        // next,
        // cache: "force-cache",
      })
      .then(async ({ products, inventory_levels }) => {
        console.log("DEBUG inventory_levels", inventory_levels);
        const vendorCacheTag = await getCacheTag("vendor_products")
        revalidateTag(vendorCacheTag)
        return products
      })
      .catch(() => [])
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
    return {
      success: false,
      error: error.toString().split("Error: ")[1],
    }
  }

  try {
    await transferCart()
  } catch (error: any) {
    return {
      success: false,
      error: error.toString().split("Error: ")[1],
    }
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


export const deleteVendorProduct = async (
  productId: string[]
): Promise<{ success: boolean, error?: string | null}> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const result = await sdk.client.fetch<{ message: string, result?: any, error?: string }>(`/vendors/products?product_ids=${productId.toString()}`, {
    method: "DELETE",
    // query: {
    //   fields: "*items",
    // },
    headers,
    // cache: "force-cache",
  })
    .then(async () => {
      const vendorCacheTag = await getCacheTag("vendor_products")
      revalidateTag(vendorCacheTag)
      return { success: true, error: null }
    })
    .catch((err) => {
      return { success: false, error: err.toString() }
    })

    return result;
}

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

export const getAllLocations = async () => {

  const authHeaders = await getAuthHeaders()

  if (!authHeaders) return null

  const headers = {
    ...authHeaders,
  }

  const next = {
    ...(await getCacheOptions("locations")),
  }

  return sdk.client
    .fetch<locationFetched & errorFetched>(
      `/vendors/vendor-locations`,
      {
        // query: {
        //   fields: "*category_children, *products",
        //   handle,
        // },
        next,
        headers,
        cache: "force-cache",
      }
    )
    .then((locations) => {
      console.log("DEBUG: locations", locations)
      return locations
    }).catch((err) => {
      console.log("DEBUG: error fetching locations", JSON.stringify(err)) 
      return null
    })
}
