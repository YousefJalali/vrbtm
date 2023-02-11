import Modal from "@/libs/ui/modal/Modal"
import dynamic from "next/dynamic"
import { SlPlus } from "react-icons/sl"
import { useMemo, useState } from "react"
import sortBy from "lodash.sortby"
import useNotebooks from "@/libs/data/queries/useNotebooks"
import { useAddToNotebook } from "@/libs/data/mutations"

const NewNotebook = dynamic(() => import("@/components/notebook/NewNotebook"), {
  ssr: false,
})

export default function SelectNotebook({ content }: { content: string }) {
  const [selectedNotebookId, setSelectedNotebookId] = useState<string | null>(
    null
  )
  const [filter, setFilter] = useState("")

  const { notebooks } = useNotebooks("list")
  const { onSubmit } = useAddToNotebook()

  const filteredNotebooks = useMemo(
    () =>
      sortBy(notebooks, ["title"]).filter((notebook) =>
        notebook.title.includes(filter)
      ),
    [notebooks, filter]
  )

  const submitHandler = () => {
    if (!selectedNotebookId) return

    console.log(selectedNotebookId, content)
    onSubmit(selectedNotebookId, content)
  }

  return (
    <>
      <Modal id="add-to-notebook-modal">
        <h3 className="text-lg font-bold">Add to Notebook</h3>
        <p className="py-4">
          Select a notebook to add the paragraph to or create a new notebook
        </p>

        <div className="overflow-hidden rounded-2xl border">
          <div className=" w-full border-b border-b-base-300">
            <input
              type="text"
              placeholder="Search…"
              className="input w-full "
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className="relative max-h-[calc(48px*7.5)] overflow-y-scroll">
            <ul className="menu  w-full bg-base-100 ">
              {filter && filteredNotebooks.length === 0 && (
                <li className="border-b py-3 text-center text-sm opacity-60">
                  No notebook found!
                </li>
              )}

              {notebooks.length === 0 && (
                <li className="border-b py-3 text-center text-sm opacity-60">
                  You dont have any notebook
                </li>
              )}

              <li className="text-primary">
                <label htmlFor="new-notebook-modal">
                  <SlPlus className="w-5" />
                  New notebook
                </label>
              </li>

              {filteredNotebooks.map((notebook, i, array) => {
                return (
                  <li key={notebook.id}>
                    {(i === 0 ||
                      notebook.title.charAt(0).toLowerCase() !==
                        array[i - 1].title.charAt(0).toLowerCase()) && (
                      <span className="menu-title sticky top-0 z-10 bg-base-200 py-0">
                        <span>{notebook.title.charAt(0).toUpperCase()}</span>
                      </span>
                    )}

                    <a>
                      <div className="form-control w-full">
                        <label className="label cursor-pointer p-0 capitalize">
                          {notebook.title}
                          <input
                            type="radio"
                            name="radio-10"
                            className="radio checked:bg-blue-500"
                            onChange={() => setSelectedNotebookId(notebook.id)}
                          />
                        </label>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="modal-action">
          <label htmlFor="add-to-notebook-modal" className="btn-ghost btn">
            Cancel
          </label>
          <button
            className="btn-primary btn"
            disabled={selectedNotebookId === null}
            onClick={submitHandler}
          >
            add
          </button>
        </div>
      </Modal>
      <NewNotebook />
    </>
  )
}
