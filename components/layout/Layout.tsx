import useWindowSize from "@/libs/hooks/useWindowSize"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { FiMenu } from "react-icons/fi"
import Header from "./Header"

export default function Layout({ children }: { children: ReactNode }) {
  const { height } = useWindowSize()
  const router = useRouter()

  return (
    <div className="drawer-mobile drawer drawer-end bg-base-100 ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex w-full flex-col items-center justify-center">
        <main
          className="min-w-screen relative mx-auto flex w-full flex-col p-6"
          style={{ minHeight: height }}
        >
          <Header>
            <label
              htmlFor="my-drawer-2"
              className="btn-primary drawer-button btn h-8 min-h-fit w-8 p-0 lg:hidden"
            >
              <FiMenu />
            </label>
          </Header>
          {children}
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-80 bg-base-100 p-4 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>
              Vrbtm
            </Link>
          </li>
          <li>
            <Link
              href="/notebooks"
              className={router.pathname === "/notebooks" ? "active" : ""}
            >
              Notebooks
            </Link>
          </li>
          <li>
            <Link
              href="/flashcards"
              className={router.pathname === "/flashcards" ? "active" : ""}
            >
              Flashcards
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
