import type { AppProps } from "next/app"
import { NotificationCtxProvider } from "@/libs/contexts/NotificationCtx"
import { AuthContextProvider } from "@/libs/contexts/AuthCtx"
import { themeChange } from "theme-change"
import "@/styles/globals.css"
import { Montserrat } from "@next/font/google"
import Layout from "@/components/layout/Layout"
import Head from "next/head"
import { useEffect, useState } from "react"
import Router from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import Cookie from "js-cookie"
// import dynamic from "next/dynamic"
import { ErrorBoundary } from "react-error-boundary"
import Custom500Comp from "@/components/500"

const font = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

// const Onboarding = dynamic(() => import("@/components/onboarding/Onboarding"), {
//   ssr: false,
//   // loading: () => (
//   //   <button className="loading btn-primary btn mt-3 w-full"></button>
//   // ),
// })

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // const [splashScreen, setSplashScreen] = useState(true)

  useEffect(() => {
    themeChange(false)

    Cookie.set("first-visit", "false")
  }, [])

  // const firstVisit = Cookie.get("first-visit")

  //loading progress bar
  NProgress.configure({ showSpinner: false })
  Router.events.on("routeChangeStart", () => NProgress.start())
  Router.events.on("routeChangeComplete", () => NProgress.done())
  Router.events.on("routeChangeError", () => NProgress.done())

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <ErrorBoundary fallback={<Custom500Comp />}>
        <div className={`${font.variable} bg-base-200 font-sans`}>
          <AuthContextProvider>
            <NotificationCtxProvider>
              {/* {splashScreen && (
              <Onboarding
                dismiss={() => setSplashScreen(false)}
                isOpen={splashScreen}
              />
            )} */}

              <Layout>
                <Component {...pageProps} />
              </Layout>

              <div id="modal" />
              <div id="prompt" />
              <div id="notification" />
            </NotificationCtxProvider>
          </AuthContextProvider>
        </div>
      </ErrorBoundary>
    </>
  )
}
