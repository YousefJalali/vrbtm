import { useNotebooks } from "@/libs/data/notebook"
import { NotebookWithFlashcards } from "@/libs/types"
import Link from "next/link"
import { useState } from "react"
import FlashcardItem from "./FlashcardItem"

export default function FlashcardList() {
  // const { flashcards, isLoading } = useFlashcards()
  const { notebooks: notebooksWithFlashcards, isLoading } =
    useNotebooks<NotebookWithFlashcards[]>("with-flashcards")
  const [search, setSearch] = useState("")

  const filteredData = (data: NotebookWithFlashcards[]) =>
    data.filter((notebook) => {
      return (
        notebook.title.includes(search) ||
        notebook.flashcards.some(
          (flashcard) =>
            flashcard.question.includes(search) ||
            flashcard.answer.includes(search)
        )
      )
    })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <input
        type="search"
        placeholder="Search..."
        className="input-bordered input w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {notebooksWithFlashcards.length === 0 ? (
        <span className="my-2 block">You do not have any flashcards.</span>
      ) : filteredData(notebooksWithFlashcards).length === 0 ? (
        <span className="my-2 block opacity-50">
          No results found for “{search}”
        </span>
      ) : (
        filteredData(notebooksWithFlashcards).map(
          (notebook) =>
            notebook.flashcards.length > 0 && (
              <section key={notebook.id} className="mt-6">
                <div className="mb-1 flex w-full items-center justify-between">
                  <span className="truncate font-bold">{notebook.title}</span>
                  <Link
                    href={`/flashcards/${notebook.id}`}
                    className="btn-ghost btn btn-xs -mr-1 p-1 opacity-60"
                  >
                    more
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
        )
      )}
    </>
  )
}
