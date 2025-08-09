import { retrieveVendor } from "@lib/data/vendor"
import { Toaster } from "@medusajs/ui"
import AccountLayout from "@modules/account/vendor/vendor-layout"

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode
  login?: React.ReactNode
}) {
  const customer = await retrieveVendor().catch(() => null)
  console.log('customer is not valid ?', customer)
  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  )
}