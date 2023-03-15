import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import Image from "next/image"

export default function Custom404() {
  return (
    <div className="prose flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <Image
        className="mb-8 w-1/2 md:w-1/4"
        src="/404.svg"
        alt="404 illustration"
        height={500}
        width={500}
      />
      <h1>Oops! Page not found.</h1>
      <span>We are sorry, but the page you requested could not be found.</span>
      <Link className="btn-primary btn mt-6 gap-2" href="/">
        <FiArrowLeft />
        Go back home
      </Link>
    </div>
  )
}
