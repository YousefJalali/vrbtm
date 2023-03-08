import dynamic from "next/dynamic"
import Link from "next/link"
import { BsCardText } from "react-icons/bs"
import { FiEdit2, FiMoreVertical, FiTrash2 } from "react-icons/fi"
// import DeleteNotebook from "../DeleteNotebook"

const DeleteNotebook = dynamic(
  () => import("@/components/notebook/DeleteNotebook"),
  {
    ssr: false,
    loading: () => (
      <button className="text-error">
        <FiTrash2 />
        Delete
      </button>
    ),
  }
)

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
    <button className="btn-ghost btn loading btn-square text-primary"></button>
  ) : isReadOnly ? (
    <>
      <ul className="hidden lg:menu lg:menu-horizontal">
        <li>
          <DeleteNotebook
            notebookId={notebookId}
            className="hover:bg-transparent hover:text-error"
          />
        </li>

        <li>
          <button
            onClick={onEdit}
            className="hover:bg-transparent hover:text-primary"
          >
            <FiEdit2 /> Edit content
          </button>
        </li>
      </ul>

      <div className="dropdown-bottom dropdown-end dropdown rounded-full p-0 lg:hidden">
        <label
          tabIndex={0}
          className="btn-ghost btn btn-sm btn-square -mr-3 p-0"
        >
          <FiMoreVertical size={18} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-56 bg-base-100 p-2 shadow"
        >
          <li>
            {/* <Link href={`/flashcards/${notebookId}`}>
            <BsCardText /> Flashcards
          </Link> */}
            <label htmlFor="flashcards-drawer">
              <BsCardText /> Flashcards
            </label>
          </li>

          <li>
            <button onClick={onEdit}>
              <FiEdit2 /> Edit content
            </button>
          </li>
          <li>
            <DeleteNotebook notebookId={notebookId} />
          </li>
        </ul>
      </div>
    </>
  ) : (
    <button
      className="btn-ghost btn btn-sm text-primary hover:bg-transparent hover:underline disabled:bg-transparent disabled:hover:bg-transparent"
      disabled={disabled}
      onClick={onSave}
    >
      save
    </button>
  )
}
