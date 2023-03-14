import dynamic from "next/dynamic"
import Link from "next/link"
import { useCallback, useMemo } from "react"
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
  const Menu = () => (
    <>
      <li className="lg:hidden">
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
    </>
  )

  return isMutating ? (
    <button className="btn loading btn-ghost btn-square text-primary"></button>
  ) : isReadOnly ? (
    <>
      <ul className="-mr-3 hidden lg:flex [&>li>button]:gap-2 [&>li>button]:btn-ghost [&>li>button]:btn-sm [&>li>button]:btn">
        <Menu />
      </ul>

      <div className="dropdown-bottom dropdown-end dropdown h-6 rounded-full p-0 lg:hidden">
        <label
          tabIndex={0}
          className="btn btn-ghost btn-square btn-xs -mr-2 p-0"
        >
          <FiMoreVertical size={18} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-56 bg-base-100 p-2 shadow"
        >
          <Menu />
        </ul>
      </div>
    </>
  ) : (
    <button
      className="btn btn-primary btn-sm"
      disabled={disabled}
      onClick={onSave}
    >
      Save
    </button>
  )
}
