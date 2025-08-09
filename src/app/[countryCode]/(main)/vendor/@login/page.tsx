import { Metadata } from "next"

import LoginTemplate from "@modules/account/vendor/login"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your When Vendor account.",
}

export default function Login() {
  return <LoginTemplate />
}
