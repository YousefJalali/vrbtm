import Modal from "@/libs/ui/modal/Modal"
import dynamic from "next/dynamic"
import { SlPlus } from "react-icons/sl"
import { ImBook } from "react-icons/im"
import { useId, useState } from "react"
import sortBy from "lodash.sortby"

const NewNotebook = dynamic(() => import("@/components/notebook/NewNotebook"), {
  ssr: false,
})

export default function SelectNotebook() {
  const [filter, setFilter] = useState("")

  const id = useId()

  const notebooks = [
    { id, name: "math", color: "#E32F22", lastEdit: "28/01/2023" },
    { id, name: "physics", color: "#422F8A", lastEdit: "28/01/2023" },
    { id, name: "biology", color: "#5DA842", lastEdit: "29/01/2023" },
    { id, name: "history", color: "#3B59A2", lastEdit: "28/01/2023" },
    { id, name: "history 2s", color: "#3B59A2", lastEdit: "28/01/2023" },
    { id, name: "art", color: "#009e6f", lastEdit: "28/01/2023" },
    { id, name: "art 2", color: "#009e6f", lastEdit: "28/01/2023" },
    { id, name: "art 3", color: "#009e6f", lastEdit: "28/01/2023" },
  ]

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
              <li className="text-primary">
                <label htmlFor="new-notebook-modal">
                  <SlPlus className="w-5" />
                  New notebook
                </label>
              </li>

              {notebooks
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
                ))}

              {sortBy(notebooks, ["name"])
                .filter((notebook) => notebook.name.includes(filter))
                .map((notebook, i, array) => {
                  return (
                    <>
                      {(i === 0 ||
                        notebook.name.charAt(0).toLowerCase() !==
                          array[i - 1].name.charAt(0).toLowerCase()) && (
                        <li className="menu-title sticky top-0 z-10 bg-base-100">
                          <span>{notebook.name.charAt(0).toUpperCase()}</span>
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
