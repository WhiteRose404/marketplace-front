import { retrieveOrders, retrieveVendor, retrieveVendorAdmin } from "@lib/data/vendor";
import VendorOverview from "@modules/account/components/vendor-overview";
import NotFound from "app/not-found";

import { Orders, VendorAdmin } from 'types/global';
import { Vendor } from 'types/global';

const VendorDashboard = async () => {
  const vendor: Vendor | null = await retrieveVendor().catch(() => null)
  const vendorAdmin: VendorAdmin | null = await retrieveVendorAdmin().catch(() => null)
  const vendorOrders: Orders[] | null = await retrieveOrders().catch(() => null)
  console.log("vendor", vendorOrders)

  if(!vendor || !vendorAdmin){
    return NotFound();
  }
  return (
    <VendorOverview vendor={vendor} vendorAdmin={vendorAdmin}/>
  );
};

export default VendorDashboard;