import Login from "@/components/auth/Login"
import Header from "@/components/layout/Header"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="p-6">
      <header className="mb-6 flex justify-end lg:hidden">
        <SideDrawerButton />
      </header>

      <Login />

      <span className="label justify-start ">
        You dont an account?
        <Link href="/signup" className="px-1 text-primary underline">
          Sign up
        </Link>
      </span>
    </main>
  )
}
