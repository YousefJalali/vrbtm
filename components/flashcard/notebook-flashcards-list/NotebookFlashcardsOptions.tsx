import { FiMoreVertical } from "react-icons/fi"
import { SlPencil, SlPlus } from "react-icons/sl"
import CreateFlashcard from "../CreateFlashcard"
import { Dispatch, SetStateAction } from "react"
import { useDeleteFlashcard } from "@/libs/data/flashcard"
import UpdateFlashcard from "../UpdateFlashcard"
import { Flashcard } from "@/libs/types"

export default function NotebookFlashcardsOptions({
  notebookId,
  selectMode,
  setSelectMode,
  selected,
  setSelected,
}: {
  notebookId: string
  selectMode: boolean
  setSelectMode: Dispatch<SetStateAction<boolean>>
  selected: Flashcard | null
  setSelected: Dispatch<SetStateAction<Flashcard | null>>
}) {
  const { onSubmit } = useDeleteFlashcard(
    selected ? selected.id : null,
    notebookId,
    () => {
      setSelected(null)
    }
  )

  return selectMode ? (
    <div className="min-h-8 space-x-1">
      <button
        className="btn-error btn-sm btn"
        disabled={!selected}
        onClick={onSubmit}
      >
        Delete
      </button>

      {selected && (
        <UpdateFlashcard
          className="btn-primary btn-ghost btn-sm btn"
          // disabled={!selected}
          defaultValues={selected}
          callback={() => setSelectMode(false)}
        >
          Edit
        </UpdateFlashcard>
      )}
    </div>
  ) : (
    <div className="dropdown-bottom dropdown-end dropdown min-h-8 h-6 rounded-full p-0">
      <label tabIndex={0} className="btn-ghost btn-xs btn-circle btn -mr-2 p-0">
        <FiMoreVertical size={18} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-56 bg-base-100 p-2 shadow"
      >
        <li>
          <CreateFlashcard notebookId={notebookId}>
            <SlPlus />
            New flashcard
          </CreateFlashcard>
        </li>

        <li>
          <button onClick={() => setSelectMode(true)}>
            <SlPencil /> Edit
          </button>
        </li>
      </ul>
    </div>
  )
}
