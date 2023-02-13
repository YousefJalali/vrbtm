import useNotebooks from "@/libs/data/queries/useNotebooks"
import Link from "next/link"

export default function NotebookList() {
  const { notebooks } = useNotebooks("list")

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="input-bordered input w-full "
      />

      <ul className="menu divide-y bg-base-100 py-2">
        {notebooks.length === 0 ? (
          <li>No notebooks</li>
        ) : (
          notebooks.map((notebook) => (
            <li key={notebook.id}>
              <Link href={`/notebooks/${notebook.title}`}>
                {notebook.title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
