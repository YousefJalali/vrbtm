import Modal from "@/libs/ui/modal/Modal"
import dynamic from "next/dynamic"
import { SlPlus } from "react-icons/sl"
import { ImBook } from "react-icons/im"
import { useId, useMemo, useState } from "react"
import sortBy from "lodash.sortby"
import { v4 as uuidv4 } from "uuid"

const NewNotebook = dynamic(() => import("@/components/notebook/NewNotebook"), {
  ssr: false,
})

export default function SelectNotebook() {
  const [filter, setFilter] = useState("")

  const notebooks = useMemo(
    () => [
      { id: uuidv4(), name: "math", color: "#E32F22", lastEdit: "28/01/2023" },
      {
        id: uuidv4(),
        name: "physics",
        color: "#422F8A",
        lastEdit: "28/01/2023",
      },
      {
        id: uuidv4(),
        name: "biology",
        color: "#5DA842",
        lastEdit: "29/01/2023",
      },
      {
        id: uuidv4(),
        name: "history",
        color: "#3B59A2",
        lastEdit: "28/01/2023",
      },
      {
        id: uuidv4(),
        name: "history 2s",
        color: "#3B59A2",
        lastEdit: "28/01/2023",
      },
      { id: uuidv4(), name: "art", color: "#009e6f", lastEdit: "28/01/2023" },
      { id: uuidv4(), name: "art 2", color: "#009e6f", lastEdit: "28/01/2023" },
      { id: uuidv4(), name: "art 3", color: "#009e6f", lastEdit: "28/01/2023" },
    ],
    []
  )

  const filteredNotebooks = useMemo(
    () =>
      sortBy(notebooks, ["name"]).filter((notebook) =>
        notebook.name.includes(filter)
      ),
    [notebooks, filter]
  )

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

              {/* {notebooks
                .splice(0, 1)
                .filter((notebook) => notebook.name.includes(filter))
                .map((notebook, i) => (
                  <>
                    {i === 0 && (
                      <li className="menu-title sticky top-0 z-10 bg-base-100">
                        <span>Recent</span>
                      </li>
                    )}
                    <li key={notebook.id}>
                      <a>
                        <ImBook className="w-5" fill={notebook.color} />
                        <div className="form-control w-full">
                          <label className="label cursor-pointer p-0 capitalize">
                            {notebook.name}
                            <input
                              type="radio"
                              name="radio-10"
                              className="radio checked:bg-blue-500"
                            />
                          </label>
                        </div>
                      </a>
                    </li>
                  </>
                ))} */}

              {filteredNotebooks.map((notebook, i, array) => {
                return (
                  <li key={notebook.id}>
                    {(i === 0 ||
                      notebook.name.charAt(0).toLowerCase() !==
                        array[i - 1].name.charAt(0).toLowerCase()) && (
                      <span className="menu-title sticky top-0 z-10 bg-base-200 py-0">
                        <span>{notebook.name.charAt(0).toUpperCase()}</span>
                      </span>
                    )}

                    <a>
                      <ImBook className="w-5" fill={notebook.color} />
                      <div className="form-control w-full">
                        <label className="label cursor-pointer p-0 capitalize">
                          {notebook.name}
                          <input
                            type="radio"
                            name="radio-10"
                            className="radio checked:bg-blue-500"
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
          <button className="btn-primary btn">add</button>
        </div>
      </Modal>
      <NewNotebook />
    </>
  )
}
