import { useUpdateNotebook } from "@/libs/data/notebook"
import { Notebook } from "@/libs/types"
import Modal from "@/libs/ui/modal/Modal"
import { ReactNode, useState } from "react"
import NotebookForm from "./NotebookForm"

export default function UpdateNotebook({
  notebook,
  className,
  children,
}: {
  notebook: Notebook
  className?: string
  children: ReactNode
}) {
  const { onSubmit, error, isMutating, reset } = useUpdateNotebook(
    "with-flashcards-count"
  )
  const [showModal, setModal] = useState(false)

  return (
    <>
      <label
        htmlFor="update-notebook-modal"
        className={className}
        onClick={() => setModal(true)}
      >
        {children}
      </label>

      <Modal
        id="update-notebook-modal"
        isOpen={showModal}
        dismiss={() => setModal(false)}
      >
        {showModal && (
          <NotebookForm
            id="update-notebook-modal"
            type="edit"
            defaultValues={notebook}
            onSubmit={onSubmit}
            onCancel={() => setModal(false)}
            error={error}
            reset={reset}
            loading={isMutating}
          />
        )}
      </Modal>
    </>
  )
}
