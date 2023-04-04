import { NotebookWithFlashcardsCount } from "@/libs/types"
import chroma from "chroma-js"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useMemo } from "react"
import { FiEdit2, FiMoreVertical } from "react-icons/fi"
import DeleteNotebook from "../DeleteNotebook"

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
  const colors = useMemo(
    () => ({
      bg: [
        `${chroma(notebook.color).set("hsv.s", "*0.3").set("hsv.v", "0.95")}`,
        `${chroma(notebook.color).set("hsv.s", "*0.5").set("hsv.v", "0.85")}`,
      ],
      text: `${chroma(notebook.color).darken(2)}`,
    }),
    [notebook.color]
  )

  return (
    <>
      <Link
        href={`/notebooks/${notebook.id}`}
        className="w-full justify-between p-0 font-semibold "
      >
        <div
          className="relative w-full rounded-lg p-3 shadow"
          style={{
            background: `linear-gradient(180deg, ${colors.bg[0]}, ${colors.bg[1]})`,
          }}
        >
          <h3
            className="mb-3 mt-5 pr-14 text-xl capitalize line-clamp-4"
            style={{ color: colors.text }}
          >
            {notebook.title}
          </h3>

          <span
            className="menu text-sm font-normal opacity-50"
            style={{ color: colors.text }}
          >
            <span>{notebook.content.length} Words</span>
            <span>{notebook._count.flashcards} Flashcards</span>
          </span>
        </div>
      </Link>

      <div className="dropdown-bottom dropdown-end dropdown absolute top-2 right-1 rounded-full p-0 active:bg-transparent">
        <label tabIndex={0} className="btn-ghost btn-xs btn-circle btn p-0">
          <FiMoreVertical size={18} color={colors.text} />
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
            <DeleteNotebook notebookId={notebook.id} />
          </li>
        </ul>
      </div>
    </>
  )
}
