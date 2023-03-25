import Link from "next/link"
import { BsCardText } from "react-icons/bs"
import { FiArrowRight, FiPlus } from "react-icons/fi"
import CreateFlashcard from "./CreateFlashcard"

export default function EmptyFlashcards({
  notebookId,
}: {
  notebookId?: string
}) {
  return (
    <div className="flex flex-col items-center bg-base-100 p-6">
      <BsCardText size={48} className="opacity-60" />
      <h3 className="mt-4 text-center text-lg font-semibold">
        No flashcards found
      </h3>
      {notebookId ? (
        <>
          <p className="mt-2 text-center opacity-60">
            We could not find any flashcards to display here.
          </p>

          <CreateFlashcard
            className="btn-primary btn-sm btn mt-4 gap-2"
            notebookId={notebookId}
          >
            new flashcard
            <FiPlus size={18} />
          </CreateFlashcard>
        </>
      ) : (
        <>
          <p className="mt-2 text-center opacity-60">
            To create flashcards, you must first create a notebook to store them
            in. Flashcards should be created from a notebook. Please navigate to
            the notebooks page.
          </p>
          <Link className="btn-primary btn-sm btn mt-4 gap-2" href="/notebooks">
            go to notebooks
            <FiArrowRight />
          </Link>
        </>
      )}
    </div>
  )
}
