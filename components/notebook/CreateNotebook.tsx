import { useCreateNotebook } from "@/libs/data/notebook"
import Modal from "@/libs/ui/modal/Modal"
import { ReactNode, useState } from "react"
import NotebookForm from "./NotebookForm"

export default function CreateNotebook({
  query = "with-flashcards-count",
  className,
  children,
}: {
  query?: "with-flashcards-count" | "list"
  className?: string
  children: ReactNode
}) {
  const [showModal, setModal] = useState(false)
  const { onSubmit, error, isMutating } = useCreateNotebook(query)

  return (
    <>
      <label
        htmlFor="new-notebook-modal"
        className={className}
        onClick={() => setModal(true)}
      >
        {children}
      </label>

      <Modal
        id="new-notebook-modal"
        isOpen={showModal}
        dismiss={() => setModal(false)}
      >
        {showModal && (
          <NotebookForm
            id="new-notebook-modal"
            onSubmit={onSubmit}
            onCancel={() => setModal(false)}
            error={error}
            loading={isMutating}
          />
        )}
      </Modal>
    </>
  )
}
