import Editor from "@/components/editor/Editor"
import FlashcardItem from "@/components/flashcard/FlashcardItem"
import NotebookFlashcardsList from "@/components/flashcard/notebook-flashcards-list/NotebookFlashcardsList"
import { useUpdateNotebookContent } from "@/libs/data/notebook"
import useNotebook from "@/libs/data/notebook/queries/useNotebook"
import { Notebook } from "@/libs/types"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiChevronLeft } from "react-icons/fi"
import Header from "../../layout/Header"
import NotebookDetailsOptions from "./NotebookDetailsOptions"

const Prompt = dynamic(() => import("@/libs/ui/prompt/Prompt"), {
  ssr: false,
  // loading: () => <p>Loading ...</p>,
})

export default function NotebookDetails({ id }: { id: string }) {
  const [value, setValue] = useState("")
  const [txtValue, setTxtValue] = useState("")
  const [initialValue, setInitialValue] = useState("")
  const [isReadOnly, setReadOnly] = useState(true)
  const [undoChange, setUndoChange] = useState(false)

  const { notebook, isLoading } = useNotebook<Notebook>(id)
  const { onSubmit, isMutating } = useUpdateNotebookContent(
    id,
    "replace",
    () => {
      setInitialValue(value)
      setReadOnly(true)
    }
  )

  useEffect(() => {
    var span = new DOMParser().parseFromString(notebook.content, "text/html")
      .documentElement.textContent
    setTxtValue(span || "")
  }, [notebook])

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

  const saveHandler = () => {
    setReadOnly((prevState) => !prevState)
    onSubmit(value)
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
    <div className="drawer-mobile drawer drawer-end">
      <input id="flashcards-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <>
          <Header
            sticky
            leftIcon={
              isReadOnly ? (
                <Link
                  href="/notebooks"
                  className="btn-ghost btn btn-sm btn-square -ml-3"
                >
                  <FiChevronLeft size={24} />
                </Link>
              ) : (
                <button
                  className="btn-ghost btn btn-sm -ml-3 text-error hover:bg-transparent hover:underline"
                  onClick={cancelHandler}
                >
                  cancel
                </button>
              )
            }
            title=""
            sectionTitle={notebook.title}
            rightIcon={
              <NotebookDetailsOptions
                {...{
                  ...{ notebookId: notebook.id },
                  ...{ onEdit: () => setReadOnly(false) },
                  ...{ onSave: saveHandler },
                  isReadOnly,
                  isMutating,
                  ...{ disabled: value === initialValue },
                }}
              />
            }
          />
          <div>
            {txtValue.trim().length === 0 && isReadOnly ? (
              <button
                className=" w-full px-6 text-left italic opacity-50"
                onClick={() => setReadOnly(false)}
              >
                A brief about the task...
              </button>
            ) : (
              <Editor
                htmlText={value}
                onChange={setValue}
                readOnly={isReadOnly}
                notebookId={notebook.id}
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
      </div>

      <div className="drawer-side border-l">
        <label htmlFor="flashcards-drawer" className="drawer-overlay"></label>
        <div className="relative w-full bg-base-100 text-base-content sm:w-80">
          <NotebookFlashcardsList aside notebookId={notebook.id} />
        </div>
      </div>
    </div>
  )
}
