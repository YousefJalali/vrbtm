import useWindowSize from "@/libs/hooks/useWindowSize"
import { ReactNode } from "react"
import Header from "./Header"
import SideDrawer from "./SideDrawer"

export default function Layout({ children }: { children: ReactNode }) {
  const { height } = useWindowSize()

  return (
    <div className="container drawer drawer-mobile bg-base-100">
      <input id="side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex w-full flex-col items-center justify-center">
        <main
          className="min-w-screen relative mx-auto flex w-full flex-col p-6"
          style={{ minHeight: height }}
        >
          <Header />
          {children}
        </main>
      </div>

      <SideDrawer />
    </div>
  )
}
