import { FiMoreVertical } from "react-icons/fi"
import { SlPencil, SlPlus } from "react-icons/sl"
import CreateFlashcard from "../CreateFlashcard"
import { Dispatch, SetStateAction } from "react"

export default function NotebookFlashcardsOptions({
  notebookId,
  selectMode,
  setSelectMode,
  selected,
}: {
  notebookId: string
  selectMode: boolean
  setSelectMode: Dispatch<SetStateAction<boolean>>
  selected: string[]
}) {
  return !selectMode ? (
    <div className="dropdown-bottom dropdown-end dropdown h-6 rounded-full p-0">
      <label tabIndex={0} className="btn-ghost btn-square btn-xs btn -mr-3 p-0">
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
  ) : (
    <div>
      <button
        className="btn-ghost btn-sm btn -mr-3 text-error hover:bg-transparent hover:underline disabled:bg-transparent disabled:hover:bg-transparent"
        disabled={selected.length === 0}
      >
        {selected.length > 1 ? "Delete all" : "Delete"}
      </button>
      <button
        className="btn-ghost btn-sm btn -mr-3 text-primary hover:bg-transparent hover:underline disabled:bg-transparent disabled:hover:bg-transparent"
        disabled={selected.length === 0 || selected.length > 1}
      >
        Edit
      </button>
    </div>
  )
}
