import Head from "next/head"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { TbServerOff } from "react-icons/tb"

export default function Custom500Comp() {
  return (
    <>
      <Head>
        <title>Server Error | VRBTM</title>
      </Head>

      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12">
        <TbServerOff size={64} />
        <div className="prose mt-6">
          <h1 className="text-center">
            Oops! An unexpected error has occurred
          </h1>
          <p className="text-center">
            Our team is on it, working tirelessly to resolve the issue. Thank
            you for your patience as we restore normalcy.
          </p>
        </div>

        <Link className="btn-primary btn mt-6 gap-2" href="/">
          <FiArrowLeft />
          Go back home
        </Link>
      </div>
    </>
  )
}
