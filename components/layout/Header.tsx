import { useRouter } from "next/router"
import { FiMenu } from "react-icons/fi"

export default function Header() {
  const router = useRouter()

  return (
    <header className="mb-6 flex h-6 w-full items-center justify-between ">
      <h1 className="font-sans text-2xl font-bold leading-none text-primary">
        {router.pathname === "/" && "VRBTM"}
        {router.pathname === "/notebooks" && "Notebooks"}
        {router.pathname === "/flashcards" && "Flashcards"}
      </h1>

      <label
        htmlFor="side-drawer"
        className="btn-primary drawer-button btn h-8 min-h-fit w-8 p-0 lg:hidden"
      >
        <FiMenu />
      </label>
    </header>
  )
}
