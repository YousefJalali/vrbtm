import Login from "@/components/auth/Login"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { isAuthenticated } from "@/utils/isAuthenticated"

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
