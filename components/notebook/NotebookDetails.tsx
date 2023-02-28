import Editor from "@/components/editor/Editor"
import { useUpdateNotebookContent } from "@/libs/data/notebook"
import useNotebook from "@/libs/data/notebook/queries/useNotebook"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiChevronLeft } from "react-icons/fi"
import Header from "../layout/Header"

const Prompt = dynamic(() => import("@/libs/ui/prompt/Prompt"), {
  ssr: false,
  // loading: () => <p>Loading ...</p>,
})

export default function NotebookDetails({ id }: { id: string }) {
  const [value, setValue] = useState("")
  const [initialValue, setInitialValue] = useState("")
  const [isReadOnly, setReadOnly] = useState(true)
  const [undoChange, setUndoChange] = useState(false)

  const { notebook, isLoading } = useNotebook(id)
  const { onSubmit, isMutating } = useUpdateNotebookContent(
    id,
    "replace",
    () => {
      setInitialValue(value)
      setReadOnly(true)
    }
  )

  useEffect(() => {
    if (notebook) {
      setValue(notebook.content)
      setInitialValue(notebook.content)
    }
  }, [notebook])

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }
  if (!notebook) {
    return (
      <main>
        <div>Notebook not found</div>
      </main>
    )
  }

  const editHandler = () => {
    setReadOnly((prevState) => !prevState)

    if (!isReadOnly && value !== initialValue) {
      onSubmit(value)
      return
    }
  }

  const cancelHandler = () => {
    if (!isReadOnly && value !== initialValue) {
      setUndoChange(true)
    } else {
      setReadOnly(true)
    }
  }

  const discardHandler = () => {
    setValue(notebook.content)
    setUndoChange(false)
    setReadOnly(true)
  }

  return (
    <>
      <Header
        leftIcon={
          isReadOnly ? (
            <Link href="/notebooks" className="btn-ghost btn-square btn -ml-5">
              <FiChevronLeft size={24} />
            </Link>
          ) : (
            <button
              className="btn-ghost btn-sm btn -ml-3 text-error"
              onClick={cancelHandler}
            >
              cancel
            </button>
          )
        }
        title=""
        rightIcon={
          <button
            className={`btn-link btn-sm btn disabled:bg-transparent ${
              isMutating ? "loading" : ""
            }`}
            onClick={editHandler}
            disabled={
              (!isReadOnly && value === initialValue) ||
              (isReadOnly && notebook.content === "")
            }
          >
            {isMutating ? "" : isReadOnly ? "Edit" : "save"}
          </button>
        }
      />
      <div>
        <div className="prose mb-6 px-6">
          <h2>{notebook.title}</h2>
          <p className="opacity-60">{notebook.description}</p>
        </div>

        {isReadOnly && notebook.content === "" ? (
          <div className="flex w-full flex-col items-center space-y-2 px-6">
            <span className="block opacity-50">
              This note book has no content.
            </span>
            <button
              className="btn-primary btn-sm btn w-fit"
              onClick={() => setReadOnly(false)}
            >
              Add content
            </button>
          </div>
        ) : (
          <Editor
            htmlText={value}
            onChange={setValue}
            readOnly={isReadOnly}
            notebook={notebook.id}
            omitMode
          />
        )}
      </div>

      <Prompt
        title="Are you sure?"
        description="All the changes will be discarded."
        actionTitle="Discard"
        actionType="error"
        action={discardHandler}
        isOpen={undoChange}
        dismiss={() => setUndoChange(false)}
      />
    </>
  )
}
