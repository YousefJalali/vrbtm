import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import Image from "next/image"

export default function Custom404() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12">
      <Image
        className="mb-8 w-1/2 md:w-1/4"
        src="/404.svg"
        alt="404 illustration"
        height={500}
        width={500}
      />
      <div className="prose">
        <h1 className="text-center">Oops! Page not found.</h1>
        <span className="text-center">
          We are sorry, but the page you requested could not be found.
        </span>
      </div>

      <Link className="btn-primary btn mt-6 gap-2" href="/">
        <FiArrowLeft />
        Go back home
      </Link>
    </div>
  )
}
