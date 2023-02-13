import Login from "@/components/auth/Login"
import Link from "next/link"

export default function LoginPage() {
  return (
    <>
      <Login />

      <span className="label justify-start ">
        You dont an account?
        <Link href="/signup" className="px-1 text-primary underline">
          Sign up
        </Link>
      </span>
    </>
  )
}
