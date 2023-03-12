import SignUp from "@/components/auth/SignUp"
import Header from "@/components/layout/Header"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <main className="p-6">
      <header className="mb-6 flex justify-end lg:hidden">
        <SideDrawerButton />
      </header>

      <SignUp />
      <span className="label justify-start ">
        Already have an account?
        <Link href="/login" className="px-1 text-primary underline">
          Login
        </Link>
      </span>
    </main>
  )
}
