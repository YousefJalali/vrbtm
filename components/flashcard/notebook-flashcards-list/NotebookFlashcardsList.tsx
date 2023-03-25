import { useFlashcards } from "@/libs/data/flashcard"
import { Flashcard } from "@/libs/types"
import { useState } from "react"
import { FiChevronLeft } from "react-icons/fi"
import EmptyFlashcards from "../EmptyFlashcards"
import FlashcardItem from "../FlashcardItem"
import NotebookFlashcardsOptions from "./NotebookFlashcardsOptions"

export default function NotebookFlashcardsList({
  notebookId,
}: {
  notebookId: string
}) {
  const [selectMode, setSelectMode] = useState(false)
  const [selected, setSelected] = useState<Flashcard | null>(null)
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

  // const selectHandler = (id: string) =>
  //   selected.includes(id)
  //     ? setSelected((prevState) =>
  //         prevState.filter((selected) => selected !== id)
  //       )
  //     : setSelected((prevState) => prevState.concat(id))

  return (
    <>
      <div className="sticky top-0 z-10 mb-2 flex justify-between border-b bg-base-100 p-6">
        {selectMode ? (
          <button
            className="btn-ghost btn-sm btn -ml-3"
            onClick={() => {
              setSelectMode(false)
              setSelected(null)
            }}
          >
            Cancel
          </button>
        ) : (
          <div className="min-h-8 relative flex items-center justify-center">
            <label
              htmlFor="flashcards-drawer"
              className="link-hover link -ml-2 flex sm:hidden"
            >
              <FiChevronLeft size={24} className="sm:hidden" /> Notebook
            </label>

            <div className="prose hidden lg:inline-block">
              <h2>Flashcards</h2>
            </div>
          </div>
        )}

        {flashcardsWithNotebook.length > 0 && (
          <NotebookFlashcardsOptions
            notebookId={notebookId}
            selectMode={selectMode}
            setSelectMode={setSelectMode}
            selected={selected}
            setSelected={setSelected}
          />
        )}
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
                  name="flashcards"
                  type="radio"
                  className="peer hidden"
                  checked={selected?.id === flashcard.id}
                  onChange={() => setSelected(flashcard)}
                  // checked={!!selected.includes(flashcard.id)}
                  // onChange={() => selectHandler(flashcard.id)}
                />
                <label
                  htmlFor={flashcard.id}
                  className="card h-full w-full cursor-pointer ring-2 ring-base-300 ring-offset-4 peer-checked:ring peer-checked:ring-primary"
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
