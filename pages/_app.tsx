import type { AppProps } from "next/app"
import "@/styles/globals.css"
import { Montserrat } from "@next/font/google"
import Layout from "@/components/layout/Layout"

const font = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={` ${font.variable}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
