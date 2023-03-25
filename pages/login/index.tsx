import Login from "@/components/auth/Login"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { isAuthenticated } from "@/utils/isAuthenticated"

export default function LoginPage() {
  return (
    <>
      <header className="fixed top-6 right-6 flex justify-end lg:hidden">
        <SideDrawerButton />
      </header>

      <div className="flex min-h-screen flex-col justify-center bg-base-200 p-6">
        <div className="mx-auto w-full md:max-w-lg">
          <div className="prose text-center">
            <h1>Login</h1>
            <p>Welcome back! Please enter your login details to continue</p>
          </div>
          <div className="mt-8 rounded-xl bg-base-100 p-6 shadow">
            <Login />

            <span className="label mt-2 justify-start">
              You dont an account?
              <Link href="/signup" className="px-1 text-primary underline">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
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
