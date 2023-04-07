import SignUp from "@/components/auth/SignUp"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { isAuthenticated } from "@/utils/isAuthenticated"
import AuthLayout from "@/components/layout/AuthLayout"
import Head from "next/head"

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up | VRBTM</title>
      </Head>
      <AuthLayout>
        <div className="prose text-center">
          <h1>Create a free account!</h1>
          <p>
            Join us today! Please fill in your information to create an account
          </p>
        </div>
        <div className="mt-8 rounded-xl bg-base-100 p-6 shadow">
          <SignUp />
          <span className="label mt-2 justify-start">
            Already have an account?
            <Link href="/login" className="px-1 text-primary underline">
              Login
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
