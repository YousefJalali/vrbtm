import Editor from "@/components/editor/Editor"
import { useUpdateNotebookContent } from "@/libs/data/notebook"
import useNotebook from "@/libs/data/notebook/queries/useNotebook"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiChevronLeft } from "react-icons/fi"
import Header from "../layout/Header"

export default function NotebookDetails({ id }: { id: string }) {
  const [value, setValue] = useState("")
  const [initialValue, setInitialValue] = useState("")
  const [isReadOnly, setReadOnly] = useState(true)

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

  return (
    <>
      <Header
        leftIcon={
          <Link href="/notebooks" className="btn-ghost btn-square btn -ml-5">
            <FiChevronLeft size={24} />
          </Link>
        }
        title=""
        rightIcon={
          <button
            className={`btn-link btn ${isMutating ? "loading" : ""}`}
            onClick={editHandler}
          >
            {isMutating ? "" : isReadOnly ? "Edit" : "save"}
          </button>
        }
      />
      <div>
        <div className="prose mb-6 px-6">
          <h3>{notebook.title}</h3>
          <p className="opacity-60">{notebook.description}</p>
        </div>

        <Editor
          htmlText={value}
          onChange={setValue}
          readOnly={isReadOnly}
          notebook={notebook.id}
          omitMode
        />
      </div>
    </>
  )
}
