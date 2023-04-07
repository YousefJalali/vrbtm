import Login from "@/components/auth/Login"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { isAuthenticated } from "@/utils/isAuthenticated"
import AuthLayout from "@/components/layout/AuthLayout"
import Head from "next/head"

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | VRBTM</title>
      </Head>
      <AuthLayout>
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
      </AuthLayout>
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
