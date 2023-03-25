import { ReactNode } from "react"
import SideDrawerButton from "./SideDrawerButton"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed top-0 right-0 flex w-full justify-end bg-base-200 p-6 pb-0 lg:hidden">
        <SideDrawerButton />
      </header>

      <div className="flex min-h-screen flex-col justify-center bg-base-200 p-6 lg:mt-0">
        <div className="mx-auto w-full md:max-w-lg">{children}</div>
      </div>
    </>
  )
}
