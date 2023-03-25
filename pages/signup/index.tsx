import SignUp from "@/components/auth/SignUp"
import SideDrawerButton from "@/components/layout/SideDrawerButton"
import Link from "next/link"
import { GetServerSideProps } from "next"
import { isAuthenticated } from "@/utils/isAuthenticated"

export default function SignUpPage() {
  return (
    <>
      <header className="fixed top-6 right-6 flex justify-end lg:hidden">
        <SideDrawerButton />
      </header>

      <div className="flex min-h-screen flex-col justify-center bg-base-200 p-6">
        <div className="mx-auto w-full md:max-w-lg">
          <div className="prose text-center">
            <h1>Create a free account!</h1>
            <p>
              Join us today! Please fill in your information to create an
              account
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
