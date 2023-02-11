import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import "@/styles/globals.css"
import { Montserrat } from "@next/font/google"
import Layout from "@/components/layout/Layout"

const font = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={`${font.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <div id="modal" />
      </div>
    </SessionProvider>
  )
}
