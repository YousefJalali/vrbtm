import useNotebooks from "@/libs/data/notebook/queries/useNotebooks"
import { Notebook, NotebookWithFlashcardsCount } from "@/libs/types"
import dynamic from "next/dynamic"
import { useState } from "react"
import { FiPlus } from "react-icons/fi"
import NotebookCard from "./notebook-item/NotebookCard"

const CreateNotebook = dynamic(
  () => import("@/components/notebook/CreateNotebook"),
  {
    ssr: false,
  }
)

export default function NotebookList() {
  const { notebooks, isLoading } = useNotebooks<NotebookWithFlashcardsCount[]>(
    "with-flashcards-count"
  )
  const [search, setSearch] = useState("")

  const filteredNotebooks = (data: typeof notebooks) =>
    data.filter(
      (notebook) =>
        notebook.title.includes(search) || notebook.content.includes(search)
    )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <input
        type="search"
        placeholder="Search..."
        className="input-bordered input w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CreateNotebook className="btn-primary btn-circle btn fixed bottom-5 right-6 z-50 mt-4 shadow">
        <FiPlus size={24} />
      </CreateNotebook>

      <ul className="mt-4 columns-2 gap-5 bg-base-100 py-2">
        {notebooks.length === 0 ? (
          <li>You do not have any notebooks.</li>
        ) : filteredNotebooks(notebooks).length > 0 ? (
          filteredNotebooks(notebooks).map((notebook) => (
            <li
              key={notebook.id}
              className="relative mb-5 inline-block w-full rounded-lg"
            >
              <NotebookCard notebook={notebook} />
            </li>
          ))
        ) : (
          <li className="opacity-50">No results found for “{search}”</li>
        )}
      </ul>
    </>
  )
}
