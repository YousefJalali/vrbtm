import { useNotebooks } from "@/libs/data/notebook"
import { NotebookWithFlashcards } from "@/libs/types"
import Link from "next/link"
import { useCallback } from "react"
import { FiChevronRight } from "react-icons/fi"
import EmptyFlashcards from "./EmptyFlashcards"
import FlashcardItem from "./FlashcardItem"

export default function FlashcardList({ search }: { search: string }) {
  const { notebooks: notebooksWithFlashcards, isLoading } =
    useNotebooks<NotebookWithFlashcards[]>("with-flashcards")

  const filteredData = useCallback(
    (data: NotebookWithFlashcards[]) => {
      const filtered: NotebookWithFlashcards[] = []
      data.forEach((notebook) => {
        const query = search.toLowerCase()
        if (
          notebook.flashcards.some(
            (flashcard) =>
              flashcard.question.toLowerCase().includes(query) ||
              flashcard.answer.toLowerCase().includes(query)
          )
        ) {
          filtered.push({
            ...notebook,
            flashcards: notebook.flashcards.filter(
              (flashcard) =>
                flashcard.question.toLowerCase().includes(query) ||
                flashcard.answer.toLowerCase().includes(query)
            ),
          })
        }
      })

      return filtered
    },
    [search]
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (notebooksWithFlashcards.length === 0) {
    return (
      <div className="my-2">
        <EmptyFlashcards />
      </div>
    )
  }

  if (filteredData(notebooksWithFlashcards).length === 0) {
    return (
      <span className="my-2 block opacity-50">
        No results found for “{search}”
      </span>
    )
  }

  return (
    <>
      {filteredData(notebooksWithFlashcards).map(
        (notebook) =>
          notebook.flashcards.length > 0 && (
            <section key={notebook.id} className="mb-6">
              <div className="mb-1 w-full">
                <Link
                  href={`/notebooks/${notebook.id}`}
                  className="link-hover link flex items-center"
                >
                  <span className="truncate font-bold">{notebook.title}</span>
                  <FiChevronRight size={18} className="ml-1" />
                </Link>
              </div>

              <div className="carousel-center carousel -mx-6 space-x-3 px-6 sm:mx-0 sm:space-x-6 sm:px-0">
                {notebook.flashcards.map((flashcard) => (
                  <div
                    key={flashcard.id}
                    className="carousel-item sm:w-[calc(50%-2rem)] sm:px-0 lg:w-64"
                  >
                    <FlashcardItem
                      flashcard={flashcard}
                      notebookColor={notebook.color}
                    />
                  </div>
                ))}
              </div>
            </section>
          )
      )}
    </>
  )
}
