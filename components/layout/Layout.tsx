import useWindowSize from "@/libs/hooks/useWindowSize"
import { ReactNode } from "react"
import SideDrawer from "./SideDrawer"
import { Notification } from "@/ui/notification"

export default function Layout({ children }: { children: ReactNode }) {
  const { height } = useWindowSize()

  return (
    <div className="drawer-mobile drawer bg-base-100">
      <input id="side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex w-full flex-col justify-center">
        <div
          className="min-w-screen relative flex w-full flex-col"
          style={{ minHeight: height }}
        >
          {children}
        </div>
      </div>

      <SideDrawer />

      <Notification />
    </div>
  )
}
