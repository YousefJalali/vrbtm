import SignUp from "@/components/auth/SignUp"
import Header from "@/components/layout/Header"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <>
      <Header title="" />

      <main className="px-6">
        <SignUp />
        <span className="label justify-start ">
          Already have an account?
          <Link href="/login" className="px-1 text-primary underline">
            Login
          </Link>
        </span>
      </main>
    </>
  )
}
