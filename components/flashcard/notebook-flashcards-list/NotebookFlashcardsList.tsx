import { useFlashcards } from "@/libs/data/flashcard"
import { useState } from "react"
import { FiChevronLeft } from "react-icons/fi"
import EmptyFlashcards from "../EmptyFlashcards"
import FlashcardItem from "../FlashcardItem"
import NotebookFlashcardsOptions from "./NotebookFlashcardsOptions"

export default function NotebookFlashcardsList({
  notebookId,
  aside = false,
}: {
  notebookId: string
  aside?: boolean
}) {
  const [selectMode, setSelectMode] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const { flashcardsWithNotebook, isLoading } = useFlashcards(notebookId)

  if (isLoading) {
    return (
      <main className="p-6">
        <div>Loading...</div>
      </main>
    )
  }

  if (!flashcardsWithNotebook) {
    return (
      <main className="px-6">
        <div>Flashcards not found</div>
      </main>
    )
  }

  const selectHandler = (id: string) =>
    selected.includes(id)
      ? setSelected((prevState) =>
          prevState.filter((selected) => selected !== id)
        )
      : setSelected((prevState) => prevState.concat(id))

  return (
    <>
      <div className="sticky top-0 z-10 mb-2 flex justify-between border-b bg-base-100 p-6">
        {selectMode ? (
          <button
            className="link-hover link"
            onClick={() => {
              setSelectMode(false)
              setSelected([])
            }}
          >
            Cancel
          </button>
        ) : (
          <div className="relative flex items-center justify-center ">
            <label
              htmlFor="flashcards-drawer"
              className="link-hover link flex sm:hidden"
            >
              <FiChevronLeft size={24} className="sm:hidden" /> Notebook
            </label>

            <div className="prose hidden lg:inline-block">
              <h4>Flashcards</h4>
            </div>
          </div>
        )}

        <NotebookFlashcardsOptions
          notebookId={notebookId}
          selectMode={selectMode}
          setSelectMode={setSelectMode}
          selected={selected}
        />
      </div>

      {flashcardsWithNotebook.length === 0 && (
        <EmptyFlashcards notebookId={notebookId} />
      )}

      <div
        className="carousel-vertical carousel space-y-6 px-6 py-2 pb-6"
        style={{ minHeight: `${flashcardsWithNotebook.length * 8}rem` }}
      >
        {flashcardsWithNotebook.map((flashcard) => (
          <div key={flashcard.id} className="carousel-item relative">
            {selectMode && (
              <div className="absolute top-0 left-0 z-10 h-full w-full sm:w-full">
                <input
                  id={flashcard.id}
                  type="checkbox"
                  className="peer hidden"
                  checked={!!selected.includes(flashcard.id)}
                  onChange={() => selectHandler(flashcard.id)}
                />
                <label
                  htmlFor={flashcard.id}
                  className="card h-full w-full cursor-pointer outline-dashed outline-offset-4 outline-base-300 peer-checked:outline-primary peer-checked:outline"
                ></label>
              </div>
            )}
            <FlashcardItem
              flashcard={flashcard}
              notebookColor={flashcard.notebook.color}
            />
          </div>
        ))}
      </div>
    </>
  )
}
