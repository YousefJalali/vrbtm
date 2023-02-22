import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import "@/styles/globals.css"
import { Montserrat } from "@next/font/google"
import Layout from "@/components/layout/Layout"
import { NotificationCtxProvider } from "@/libs/contexts/NotificationCtx"
import Head from "next/head"

const font = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <SessionProvider session={session}>
        <div className={`${font.variable} font-sans`}>
          <NotificationCtxProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>

            <div id="modal" />
            <div id="notification" />
          </NotificationCtxProvider>
        </div>
      </SessionProvider>
    </>
  )
}
