import {
  BsCardText,
  BsJournalText,
  BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import Logo from "./Logo"
import { useUser } from "@/libs/contexts/AuthCtx"
import ProfileButton from "../profile/ProfileButton"

export default function SideDrawer() {
  const [theme, setTheme] = useState<string | null>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const router = useRouter()
  const { user, isLoading } = useUser()

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
        <li className="mb-6">
          <Link
            href="/"
            onClick={clickHandler}
            className="flex h-full w-full justify-center hover:bg-transparent [&>svg]:w-1/2"
          >
            <Logo />
          </Link>
        </li>

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

        <ul className="menu flex flex-1 justify-end space-y-2">
          {isLoading ? (
            <li>
              <span>Loading...</span>
            </li>
          ) : user ? (
            <li className="rounded-xl border">
              <ProfileButton user={user} onClick={clickHandler} />
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/signup"
                  onClick={clickHandler}
                  className={router.pathname === "/signup" ? "active" : ""}
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  onClick={clickHandler}
                  className={router.pathname === "/login" ? "active" : ""}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>

        <li className="form-control w-full border-t pt-2">
          <label className="label cursor-pointer">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={theme?.trim() === "dark"}
              onChange={() =>
                setTheme((prevState) =>
                  prevState === "winter" ? "dark" : "winter"
                )
              }
              className="checked toggle-primary toggle"
              data-toggle-theme="winter, dark"
            />
          </label>
        </li>
      </ul>
    </div>
  )
}
