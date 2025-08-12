import { retrieveVendor, retrieveVendorAdmin } from "@lib/data/vendor"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/vendor/vendor-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const customer = await retrieveVendorAdmin().catch(() => null)
  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}