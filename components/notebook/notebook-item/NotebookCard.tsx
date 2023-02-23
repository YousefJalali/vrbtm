import { useDeleteNotebook } from "@/libs/data/notebook"
import { NotebookWithFlashcardsCount } from "@/libs/types"
import chroma from "chroma-js"
import dynamic from "next/dynamic"
import Link from "next/link"
import { FiEdit2, FiMoreVertical, FiTrash2 } from "react-icons/fi"

const UpdateNotebook = dynamic(
  () => import("@/components/notebook/UpdateNotebook"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
)

export default function NotebookCard({
  notebook,
}: {
  notebook: NotebookWithFlashcardsCount
}) {
  const { onSubmit: deleteHandler, error } = useDeleteNotebook(
    notebook.id,
    "with-flashcards-count"
  )

  const color = `${chroma(notebook.color).darken(2)}`
  const bgColor = [
    `${chroma(notebook.color).alpha(0.3)}`,
    `${chroma(notebook.color).alpha(0.6)}`,
  ]

  return (
    <>
      <Link
        href={`/notebooks/${notebook.id}`}
        className="w-full justify-between p-0 font-semibold "
      >
        <div
          className="relative w-full rounded-lg p-3 shadow"
          style={{
            background: `linear-gradient(180deg, ${bgColor[0]}, ${bgColor[1]})`,
          }}
        >
          <h3
            className="mb-3 mt-5 pr-14 text-xl capitalize line-clamp-4"
            style={{ color }}
          >
            {notebook.title}
          </h3>

          <span
            className="menu text-sm font-normal opacity-50"
            style={{ color }}
          >
            <span>{notebook.content.length} Words</span>
            <span>{notebook._count.flashcards} Flashcards</span>
          </span>
        </div>
      </Link>

      <div className="active: dropdown-bottom dropdown-end dropdown absolute top-1 right-0 rounded-full p-0 active:bg-transparent">
        <label tabIndex={0} className="btn-link btn-square btn-sm btn p-0 ">
          <FiMoreVertical size={18} color={color} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <UpdateNotebook notebook={notebook}>
              <FiEdit2 /> Edit
            </UpdateNotebook>
          </li>
          <li>
            <a className="text-error" onClick={deleteHandler}>
              <FiTrash2 />
              Delete
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
