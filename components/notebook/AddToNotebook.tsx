import Modal from "@/libs/ui/modal/Modal"
import { useState } from "react"
import SelectNotebook from "./SelectNotebook"

export default function AddToNotebook({ content }: { content: string }) {
  const [showModal, setModal] = useState(false)

  return (
    <>
      <button
        className="btn-primary btn mt-3 w-full"
        onClick={() => setModal(true)}
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
