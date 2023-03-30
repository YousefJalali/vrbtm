import Modal from "@/libs/ui/modal/Modal"
import { ButtonHTMLAttributes, useState } from "react"
import SelectNotebook from "./SelectNotebook"

export default function AddToNotebook({
  content,
  ...props
}: { content: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const [showModal, setModal] = useState(false)

  return (
    <>
      <button
        className="btn-primary btn mt-3 w-full"
        onClick={() => setModal(true)}
        {...props}
      >
        Add To Notebook
      </button>

      <Modal
        id="add-to-notebook-modal"
        isOpen={showModal}
        dismiss={() => setModal(false)}
      >
        <SelectNotebook content={content} callback={() => setModal(false)} />
      </Modal>
    </>
  )
}
