import {
  BsCardText,
  BsJournalText,
  BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

export default function SideDrawer() {
  const [theme, setTheme] = useState<string | null>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const router = useRouter()

  const clickHandler = () => {
    if (labelRef.current) {
      labelRef.current.click()
    }
  }

  useEffect(() => {
    setTheme(localStorage.getItem("theme"))
  }, [])

  return (
    <div className="drawer-side border-r">
      <label
        ref={labelRef}
        htmlFor="side-drawer"
        className="drawer-overlay"
      ></label>

      <ul className="menu w-80 space-y-2 bg-base-100 p-6 text-base-content">
        <li className="prose mb-6 flex">
          <h1 className="p-0 text-primary">VRBTM</h1>
        </li>
        {/* <!-- Sidebar content here --> */}
        <li>
          <Link
            href="/"
            onClick={clickHandler}
            className={router.pathname === "/" ? "active" : ""}
          >
            <BsReverseLayoutTextSidebarReverse />
            Verbatim
          </Link>
        </li>
        <li>
          <Link
            href="/notebooks"
            onClick={clickHandler}
            className={router.pathname.includes("/notebooks") ? "active" : ""}
          >
            <BsJournalText />
            Notebooks
          </Link>
        </li>
        <li>
          <Link
            href="/flashcards"
            onClick={clickHandler}
            className={router.pathname === "/flashcards" ? "active" : ""}
          >
            <BsCardText />
            Flashcards
          </Link>
        </li>

        <ul className="menu flex flex-1 justify-end">
          <li>
            <Link href="/signup" onClick={clickHandler}>
              Sign Up
            </Link>
          </li>

          <li>
            <Link href="/login" onClick={clickHandler}>
              Login
            </Link>
          </li>
        </ul>

        <li className="form-control w-full border-t pt-2">
          <label className="label cursor-pointer">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={theme?.trim() === "dark"}
              onChange={() =>
                setTheme((prevState) =>
                  prevState === "light" ? "dark" : "light"
                )
              }
              className="checked toggle-primary toggle"
              data-toggle-theme="light, dark"
            />
          </label>
        </li>
      </ul>
    </div>
  )
}
