import useWindowSize from "@/libs/hooks/useWindowSize"
import { ReactNode } from "react"
import SideDrawer from "./SideDrawer"
import { Notification } from "@/ui/notification"

export default function Layout({ children }: { children: ReactNode }) {
  const { height } = useWindowSize()

  return (
    <div className="drawer drawer-mobile mx-auto max-w-[100rem] bg-base-100">
      {/* <div className="absolute top-6 z-50 h-[1px] w-screen bg-primary" />
      <div className="absolute bottom-6 z-50 h-[1px] w-screen bg-primary" />
      <div className="absolute left-6 z-50 h-screen w-[1px] bg-primary" />
      <div className="absolute right-6 z-50 h-screen w-[1px] bg-primary" /> */}

      <input id="side-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex w-full flex-col justify-center">
        <div
          className="min-w-screen relative flex min-h-screen w-full flex-col overflow-hidden"
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
