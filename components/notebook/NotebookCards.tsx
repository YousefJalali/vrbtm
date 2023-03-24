import useNotebooks from "@/libs/data/notebook/queries/useNotebooks"
import { NotebookWithFlashcardsCount } from "@/libs/types"
import EmptyNotebooks from "./EmptyNotebooks"
import NotebookCard from "./notebook-item/NotebookCard"

export default function NotebookCards({ search }: { search: string }) {
  const { notebooks, isLoading } = useNotebooks<NotebookWithFlashcardsCount[]>(
    "with-flashcards-count"
  )

  const filteredNotebooks = (data: typeof notebooks) =>
    data.filter(
      (notebook) =>
        notebook.title.includes(search) || notebook.content.includes(search)
    )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return notebooks.length === 0 ? (
    <EmptyNotebooks />
  ) : (
    <ul className="columns-2 gap-5 bg-base-100 pb-2 sm:columns-3xs">
      {filteredNotebooks(notebooks).length > 0 ? (
        filteredNotebooks(notebooks).map((notebook) => (
          <li
            key={notebook.id}
            className="relative mb-5 inline-block w-full rounded-lg"
          >
            <NotebookCard notebook={notebook} />
          </li>
        ))
      ) : (
        <li className="opacity-50">
          <span>No results found for “{search}”</span>
        </li>
      )}
    </ul>
  )
}
