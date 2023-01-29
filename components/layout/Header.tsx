import { useRouter } from "next/router"
import { ReactNode } from "react"

export default function Header({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <header className="mb-6 flex h-6 w-full items-center justify-between">
      <h1 className="font-sans text-2xl font-bold leading-none text-primary">
        {router.pathname === "/" && "Vrbtm"}
        {router.pathname === "/notebooks" && "Notebooks"}
        {router.pathname === "/flashcards" && "Flashcards"}
      </h1>

      {children}
    </header>
  )
}
