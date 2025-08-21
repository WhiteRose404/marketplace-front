import React from "react"

import { HttpTypes } from "@medusajs/types"
import { VendorAdmin } from "types/global"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | VendorAdmin | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div>{children}</div>
  )
}

export default AccountLayout
