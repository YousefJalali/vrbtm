import { useCreateFlashcard } from "@/libs/data/flashcard"
import Modal from "@/libs/ui/modal/Modal"
import { Flashcard } from "@prisma/client"
import { ButtonHTMLAttributes, ReactNode, useState } from "react"
import FlashcardForm from "./FlashcardForm"

export default function CreateFlashcard({
  notebookId,
  children,
  defaultValues,
  ...props
}: {
  notebookId: string
  children: ReactNode
  defaultValues?: Partial<Flashcard>
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onSubmit, error, isMutating } = useCreateFlashcard(notebookId)
  const [showModal, setModal] = useState(false)

  return (
    <>
      <button onClick={() => setModal(true)} {...props}>
        {children}
      </button>

      <Modal
        id="new-flashcard-modal"
        isOpen={showModal}
        dismiss={() => setModal(false)}
        closeButton
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
