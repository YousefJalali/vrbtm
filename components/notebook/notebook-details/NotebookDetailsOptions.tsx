import Link from "next/link"
import { BsCardText } from "react-icons/bs"
import { FiEdit2, FiMoreVertical, FiTrash2 } from "react-icons/fi"

export default function NotebookDetailsOptions({
  notebookId,
  isReadOnly,
  isMutating,
  disabled,
  onEdit,
  onSave,
}: {
  notebookId: string
  isReadOnly: boolean
  isMutating: boolean
  disabled: boolean
  onEdit: () => void
  onSave: () => void
}) {
  return isMutating ? (
    <button className="loading btn-ghost btn-square btn text-primary"></button>
  ) : isReadOnly ? (
    <div className="dropdown-bottom dropdown-end dropdown rounded-full p-0">
      <label tabIndex={0} className="btn-ghost btn-sm btn-square btn p-0">
        <FiMoreVertical size={18} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-56 bg-base-100 p-2 shadow"
      >
        <li>
          <Link href={`/flashcards/${notebookId}`}>
            <BsCardText /> Flashcards
          </Link>
        </li>

        <li>
          <button onClick={onEdit}>
            <FiEdit2 /> Edit content
          </button>
        </li>
        <li>
          <a className="text-error">
            <FiTrash2 />
            Delete notebook
          </a>
        </li>
      </ul>
    </div>
  ) : (
    <button
      className="btn-ghost btn-sm btn text-primary hover:bg-transparent hover:underline disabled:bg-transparent disabled:hover:bg-transparent"
      disabled={disabled}
      onClick={onSave}
    >
      save
    </button>
  )
}
