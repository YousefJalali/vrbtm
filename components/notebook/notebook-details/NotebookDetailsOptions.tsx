import dynamic from "next/dynamic"
import { BsCardText } from "react-icons/bs"
import { FiEdit2, FiMoreVertical, FiTrash2 } from "react-icons/fi"

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
  readOnly,
  isMutating,
  disabled,
  onEdit,
  onSave,
}: {
  notebookId: string
  readOnly: boolean
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
          <FiEdit2 />
          <span>
            Edit <span className="lg:hidden xl:inline-block">content</span>
          </span>
        </button>
      </li>
      <li>
        <DeleteNotebook notebookId={notebookId} />
      </li>
    </>
  )

  return isMutating ? (
    <button className="loading btn-primary btn-sm btn">Saving...</button>
  ) : readOnly ? (
    <>
      <ul className="-mr-3 hidden lg:flex [&>li>button]:gap-2 [&>li>button]:btn-ghost [&>li>button]:btn-sm [&>li>button]:btn">
        <Menu />
      </ul>

      <div className="dropdown-bottom dropdown-end dropdown h-6 rounded-full p-0 lg:hidden">
        <label
          tabIndex={0}
          className="btn-ghost btn-xs btn-circle btn -mr-2 p-0"
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
    <div className="flex gap-2">
      <label
        htmlFor="editor-control-side"
        className="btn-primary btn-outline drawer-button btn-sm btn lg:hidden"
      >
        Omit
      </label>
      <button
        className="btn-primary btn-sm btn"
        disabled={disabled}
        onClick={onSave}
      >
        Save
      </button>
    </div>
  )
}
