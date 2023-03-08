import { useFlashcards } from "@/libs/data/flashcard"
import { useNotebook } from "@/libs/data/notebook"
import { Flashcard } from "@/libs/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { FiChevronLeft, FiEdit, FiEdit2 } from "react-icons/fi"
import Header from "../../layout/Header"
import CreateFlashcard from "../CreateFlashcard"
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
  const router = useRouter()

  if (isLoading) {
    return (
      <main className="px-6">
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
      <Header
        sticky
        leftIcon={
          selectMode ? (
            <button
              className="btn-ghost btn btn-sm -ml-3"
              onClick={() => {
                setSelectMode(false)
                setSelected([])
              }}
            >
              cancel
            </button>
          ) : !aside ? (
            <button
              onClick={router.back}
              className="btn-ghost btn btn-sm btn-square -ml-3"
            >
              <FiChevronLeft size={24} />
            </button>
          ) : (
            <div className="space-x-0">
              <label
                htmlFor="flashcards-drawer"
                className="btn-ghost btn btn-sm btn-square -ml-3 lg:hidden"
              >
                <FiChevronLeft size={24} />
              </label>
              <div className="prose m-0 hidden lg:block">
                <h3>Flashcards</h3>
              </div>
            </div>
          )
        }
        title=""
        sectionTitle={
          aside
            ? undefined
            : flashcardsWithNotebook.length > 0
            ? flashcardsWithNotebook[0].notebook.title
            : ""
        }
        rightIcon={
          flashcardsWithNotebook.length > 0 ? (
            <NotebookFlashcardsOptions
              notebookId={flashcardsWithNotebook[0].notebook.id}
              selectMode={selectMode}
              setSelectMode={setSelectMode}
              selected={selected}
            />
          ) : (
            <div />
          )
        }
      />

      {flashcardsWithNotebook.length === 0 && (
        <div className="card mx-6 border">
          <div className="card-body">
            <h4 className="card-title">No flashcards</h4>
            <p>This notebook has no associated flashcards.</p>
            <div className="cards-actions">
              <CreateFlashcard
                className="btn-primary btn btn-sm mt-3"
                notebookId={notebookId}
              >
                new flashcard
              </CreateFlashcard>
            </div>
          </div>
        </div>
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
