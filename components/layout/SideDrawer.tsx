import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/router"

const AuthButton = dynamic(() => import("@/components/auth/AuthButton"), {
  ssr: false,
})

export default function SideDrawer() {
  const router = useRouter()

  return (
    <div className="drawer-side">
      <label htmlFor="side-drawer" className="drawer-overlay"></label>

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

        <li className="flex flex-1 justify-end space-y-2">
          <AuthButton variant="sign up" />
          <AuthButton variant="login" />
        </li>
      </ul>
    </div>
  )
}
