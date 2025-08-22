"use server";

import { listCategories } from "@lib/data/categories";
import { retrieveOrders, retrieveVendor, retrieveVendorAdmin, retrieveProducts } from "@lib/data/vendor";
import VendorOverview from "@modules/account/components/vendor-overview";
import NotFound from "app/not-found";

import { Metadata, ResolvingMetadata } from "next"

import { Orders, VendorAdmin } from 'types/global';
import { Vendor } from 'types/global';

type Props = {
  params: Promise<{ countryCode: string, id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const vendor: Vendor | null = await retrieveVendor().catch(() => null);
  if (!vendor) {
    return {
      title: 'Vendor Not Found',
      openGraph: {
        title: 'Vendor Not Found',
        description: 'The requested vendor could not be found.',
      },
    }
  }

  return {
    title: `${vendor.name} Dashboard`,
    description: `Dashboard for vendor ${vendor.name}`,
    openGraph: {
      title: `${vendor.name} Dashboard`,
      description: `Dashboard for vendor ${vendor.name}`,
      url: `/vendor/${vendor.id}`,
      images: [
        {
          url: vendor.logo || '/default-logo.png',
          alt: `${vendor.name} Logo`,
        },
      ],
    },
  }
}


const VendorDashboard = async (props: Props) => {
  const params = await props.params;
  const { countryCode } = params;
  const vendor: Vendor | null = await retrieveVendor().catch(() => null)
  const vendorAdmin: VendorAdmin | null = await retrieveVendorAdmin().catch(() => null)
  const vendorOrders: Orders[] | null = await retrieveOrders().catch(() => null);
  const vendorProducts = await retrieveProducts().catch(() => null);
  const collection = await listCategories();
  console.log("vendor", vendor);

  if(!vendor || !vendorAdmin){
    return NotFound();
  }
  return (
    <VendorOverview countryCode={countryCode} vendor={vendor} vendorAdmin={vendorAdmin} namedCategories={collection.map(collection => collection.name )} vendorOrders={vendorOrders} vendorProducts={vendorProducts}/>
  );
};

export default VendorDashboard;