import { useCreateFlashcard } from "@/libs/data/flashcard"
import Modal from "@/libs/ui/modal/Modal"
import { Flashcard } from "@prisma/client"
import { ReactNode, useState } from "react"
import FlashcardForm from "./FlashcardForm"

export default function CreateFlashcard({
  className,
  children,
  defaultValues,
}: {
  className?: string
  children: ReactNode
  defaultValues?: Partial<Flashcard>
}) {
  const { onSubmit, error } = useCreateFlashcard()
  const [showModal, setModal] = useState(false)

  return (
    <>
      <label
        htmlFor="new-flashcard-modal"
        className={className}
        onClick={() => setModal(true)}
      >
        {children}
      </label>

      <Modal
        id="new-flashcard-modal"
        isOpen={showModal}
        dismiss={() => setModal(false)}
      >
        {showModal && (
          <FlashcardForm
            id="new-flashcard-modal"
            onSubmit={onSubmit}
            error={error}
            defaultValues={defaultValues}
            onCancel={() => setModal(false)}
          />
        )}
      </Modal>
    </>
  )
}
