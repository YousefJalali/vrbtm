import { useNotebook } from "@/libs/data/notebook"
import { NotebookWithFlashcards } from "@/libs/types"
import { useRouter } from "next/router"
import { FiChevronLeft, FiEdit, FiEdit2 } from "react-icons/fi"
import Header from "../layout/Header"
import FlashcardItem from "./FlashcardItem"

export default function NotebookFlashcardsList({ id }: { id: string }) {
  const { notebook, isLoading } = useNotebook<NotebookWithFlashcards>(
    id,
    "with-flashcards"
  )
  const router = useRouter()

  if (isLoading) {
    return (
      <main className="px-6">
        <div>Loading...</div>
      </main>
    )
  }

  if (!notebook) {
    return (
      <main className="px-6">
        <div>Flashcards not found</div>
      </main>
    )
  }

  return (
    <>
      <Header
        sticky
        leftIcon={
          <a
            onClick={router.back}
            className="btn-ghost btn-sm btn-square btn -ml-3"
          >
            <FiChevronLeft size={24} />
          </a>
        }
        title=""
        sectionTitle={notebook.title}
        rightIcon={
          <button className="btn-ghost btn-sm btn-square btn mr-3">edit</button>
        }
      />

      <div
        className="carousel-vertical carousel h-full space-y-6 pb-6"
        style={{ minHeight: `${notebook._count.flashcards * 8}rem` }}
      >
        {notebook.flashcards.map((flashcard) => (
          <div key={flashcard.id} className="carousel-item">
            <FlashcardItem
              flashcard={flashcard}
              notebookColor={notebook.color}
            />
          </div>
        ))}
      </div>
    </>
  )
}
