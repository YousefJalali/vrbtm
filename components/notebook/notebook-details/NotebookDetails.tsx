import Editor from "@/components/editor/Editor"
import NotebookFlashcardsList from "@/components/flashcard/notebook-flashcards-list/NotebookFlashcardsList"
import { useUpdateNotebookContent } from "@/libs/data/notebook"
import useNotebook from "@/libs/data/notebook/queries/useNotebook"
import { Notebook } from "@/libs/types"
import { getTextFromHtml } from "@/utils"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsJournalText } from "react-icons/bs"
import { FiChevronLeft, FiPlus } from "react-icons/fi"
import NotebookDetailsOptions from "./NotebookDetailsOptions"

const Prompt = dynamic(() => import("@/libs/ui/prompt/Prompt"), {
  ssr: false,
  // loading: () => <p>Loading ...</p>,
})

export default function NotebookDetails({ id }: { id: string }) {
  const [value, setValue] = useState("")
  const [txtValue, setTxtValue] = useState("")
  const [initialValue, setInitialValue] = useState("")
  const [readOnly, setReadOnly] = useState(true)
  const [isOmit, setOmit] = useState(true)
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
    if (notebook) {
      setValue(notebook.content)
      setInitialValue(notebook.content)

      const extractedText = getTextFromHtml(notebook.content)
      setTxtValue(extractedText || "")
    }
  }, [notebook])

  if (isLoading) {
    return (
      <main className="p-6">
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
    if (!readOnly && value !== initialValue) {
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

  const editMode = () => {
    setReadOnly(false)
    setOmit(false)
  }

  return (
    <div className="drawer-mobile drawer drawer-end">
      <input id="flashcards-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <header className="flex w-full items-center justify-between bg-base-100 p-6 lg:border-b">
          {readOnly ? (
            <Link
              href="/notebooks"
              className="link-hover link min-h-8 -ml-2 flex items-center"
            >
              <FiChevronLeft size={24} />
              <span>Notebooks</span>
            </Link>
          ) : (
            <button
              className="btn-ghost btn-sm btn -ml-3"
              onClick={cancelHandler}
            >
              Cancel
            </button>
          )}

          <NotebookDetailsOptions
            {...{
              ...{ notebookId: notebook.id },
              ...{ onEdit: editMode },
              ...{ onSave: saveHandler },
              readOnly,
              isMutating,
              ...{ disabled: value === initialValue },
            }}
          />
        </header>

        <section className="flex h-screen max-h-screen w-full flex-col overflow-scroll md:pt-4">
          <div className="prose px-6">
            <h1>{notebook.title}</h1>
          </div>

          {txtValue.trim().length === 0 && readOnly ? (
            <div className="mt-8 flex w-full flex-col items-center justify-center gap-4">
              <BsJournalText size={48} className="opacity-60" />
              <p>This notebook has no content.</p>
              <button
                className="btn-primary btn-sm btn gap-2"
                onClick={editMode}
              >
                <FiPlus size={18} />
                Add content
              </button>
            </div>
          ) : (
            <Editor
              htmlText={value}
              onChange={setValue}
              readOnly={readOnly}
              notebookId={notebook.id}
              isOmit={isOmit}
              title={notebook.title}
            />
          )}
        </section>

        <Prompt
          title="Are you sure?"
          description="All the changes will be discarded."
          actionTitle="Discard"
          actionType="error"
          action={discardHandler}
          isOpen={undoChange}
          dismiss={() => setUndoChange(false)}
        />
      </div>

      {readOnly && (
        <div className="drawer-side border-l">
          <label htmlFor="flashcards-drawer" className="drawer-overlay"></label>
          <div className="relative w-full bg-base-100 text-base-content sm:w-80">
            <NotebookFlashcardsList notebookId={notebook.id} />
          </div>
        </div>
      )}
    </div>
  )
}
