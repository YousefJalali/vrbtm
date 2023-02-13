import SignUp from "@/components/auth/SignUp"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <>
      <SignUp />
      <span className="label justify-start ">
        Already have an account?
        <Link href="/login" className="px-1 text-primary underline">
          Login
        </Link>
      </span>
    </>
  )
}
