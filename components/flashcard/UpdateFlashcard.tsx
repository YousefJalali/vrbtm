import { useUpdateFlashcard } from "@/libs/data/flashcard"
import Modal from "@/libs/ui/modal/Modal"
import { Flashcard } from "@prisma/client"
import { ReactNode, useState } from "react"
import FlashcardForm from "./FlashcardForm"

export default function UpdateFlashcard({
  className,
  children,
  defaultValues,
  callback,
  ...props
}: {
  className?: string
  children: ReactNode
  defaultValues: Flashcard
  callback?: () => void
}) {
  const { onSubmit, error, isMutating } = useUpdateFlashcard(
    defaultValues.id,
    callback
  )
  const [showModal, setModal] = useState(false)

  return (
    <>
      <button className={className} onClick={() => setModal(true)} {...props}>
        {children}
      </button>

      <Modal
        id="update-flashcard-modal"
        isOpen={showModal}
        dismiss={() => setModal(false)}
      >
        <FlashcardForm
          type="edit"
          id="update-flashcard-modal"
          onSubmit={onSubmit}
          error={error}
          loading={isMutating}
          defaultValues={defaultValues}
          onCancel={() => setModal(false)}
        />
      </Modal>
    </>
  )
}
