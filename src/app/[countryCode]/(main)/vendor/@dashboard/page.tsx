"use server";

import { listCategories } from "@lib/data/categories";
import { retrieveOrders, retrieveVendor, retrieveVendorAdmin, retrieveProducts } from "@lib/data/vendor";
import VendorOverview from "@modules/account/components/vendor-overview";
import NotFound from "app/not-found";

import { Orders, VendorAdmin } from 'types/global';
import { Vendor } from 'types/global';

const VendorDashboard = async () => {
  const vendor: Vendor | null = await retrieveVendor().catch(() => null)
  const vendorAdmin: VendorAdmin | null = await retrieveVendorAdmin().catch(() => null)
  const vendorOrders: Orders[] | null = await retrieveOrders().catch(() => null);
  const vendorProducts = await retrieveProducts().catch(() => null);
  const collection = await listCategories();
  console.log("vendor", vendorProducts);

  if(!vendor || !vendorAdmin){
    return NotFound();
  }
  return (
    <VendorOverview vendor={vendor} vendorAdmin={vendorAdmin} namedCategories={collection.map(collection => collection.name )} vendorOrders={vendorOrders} vendorProducts={vendorProducts}/>
  );
};

export default VendorDashboard;