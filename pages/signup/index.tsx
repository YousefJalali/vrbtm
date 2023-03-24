import SignUp from "@/components/auth/SignUp"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { isAuthenticated } from "@/utils/isAuthenticated"

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await isAuthenticated(req)

  if (user) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
