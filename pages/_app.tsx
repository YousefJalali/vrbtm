import type { AppProps } from "next/app"
import { NotificationCtxProvider } from "@/libs/contexts/NotificationCtx"
import { AuthContextProvider } from "@/libs/contexts/AuthCtx"
import { themeChange } from "theme-change"
import "@/styles/globals.css"
import { Montserrat } from "@next/font/google"
import Layout from "@/components/layout/Layout"
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
      <div className={`${font.variable} font-sans`}>
        <AuthContextProvider>
          <NotificationCtxProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>

            <div id="modal" />
            <div id="prompt" />
            <div id="notification" />
          </NotificationCtxProvider>
        </AuthContextProvider>
      </div>
    </>
  )
}
