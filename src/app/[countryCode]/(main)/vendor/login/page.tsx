import { Metadata } from "next"

import LoginTemplate from "@modules/account/vendor/login"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Medusa Store account.",
}

export default function Login() {
  return <LoginTemplate />
}
