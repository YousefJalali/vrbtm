import { useCreateFlashcard } from "@/libs/data/flashcard"
import { Notebook } from "@/libs/types"
import Modal from "@/libs/ui/modal/Modal"
import { Flashcard } from "@prisma/client"
import { ReactNode, useState } from "react"
import FlashcardForm from "./FlashcardForm"

export default function CreateFlashcard({
  notebookId,
  className,
  children,
  defaultValues,
}: {
  notebookId: string
  className?: string
  children: ReactNode
  defaultValues?: Partial<Flashcard>
}) {
  const { onSubmit, error, isMutating } = useCreateFlashcard(notebookId)
  const [showModal, setModal] = useState(false)

  return (
    <>
      <button className={className} onClick={() => setModal(true)}>
        {children}
      </button>

      <Modal
        id="new-flashcard-modal"
        isOpen={showModal}
        dismiss={() => setModal(false)}
      >
        <FlashcardForm
          id="new-flashcard-modal"
          onSubmit={onSubmit}
          error={error}
          loading={isMutating}
          defaultValues={{ notebookId, ...defaultValues }}
          onCancel={() => setModal(false)}
        />
      </Modal>
    </>
  )
}
