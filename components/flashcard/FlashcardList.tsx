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
                <div className="flex w-full items-center justify-between space-x-2">
                  <span className="truncate font-bold">{notebook.title}</span>
                  <Link
                    href="/flashcards"
                    className=" btn-ghost btn-xs btn p-0 opacity-60"
                  >
                    view all
                  </Link>
                </div>

                <div className="carousel-center carousel -mx-6 max-w-md space-x-3 px-6">
                  {notebook.flashcards.map((flashcard) => (
                    <div key={flashcard.id} className="carousel-item">
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
