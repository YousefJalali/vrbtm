import type { AppProps } from "next/app"
import { themeChange } from "theme-change"
import { SessionProvider } from "next-auth/react"
import "@/styles/globals.css"
import { Montserrat } from "@next/font/google"
import Layout from "@/components/layout/Layout"
import { NotificationCtxProvider } from "@/libs/contexts/NotificationCtx"
import Head from "next/head"
import { useEffect } from "react"

const font = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  useEffect(() => {
    themeChange(false)
  }, [])

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
