import { BsCardText } from "react-icons/bs"
import { FiPlus } from "react-icons/fi"
import CreateFlashcard from "./CreateFlashcard"

export default function EmptyFlashcards({
  notebookId,
}: {
  notebookId: string
}) {
  return (
    <div className="flex flex-col items-center bg-base-100 p-6">
      <BsCardText size={48} className="opacity-60" />
      <h3 className="mt-4 text-center text-lg font-semibold">No flashcards</h3>
      <p className="mt-2 text-center opacity-60">
        We could not find any flashcards to display here.
      </p>

      <CreateFlashcard
        className="btn-outline btn-primary btn-ghost btn-sm btn mt-4 gap-2 text-primary"
        notebookId={notebookId}
      >
        new flashcard
        <FiPlus size={18} />
      </CreateFlashcard>
    </div>
  )
}
