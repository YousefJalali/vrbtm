import { useDeleteNotebook } from "@/libs/data/notebook"
import Prompt from "@/libs/ui/prompt/Prompt"
import { useRouter } from "next/router"
import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"

export default function DeleteNotebook({
  notebookId,
  className,
}: {
  notebookId: string
  className?: string
}) {
  const [prompt, setPrompt] = useState(false)

  const router = useRouter()

  const { onSubmit: deleteHandler, error } = useDeleteNotebook(
    notebookId,
    "with-flashcards-count",
    () => router.query.id && router.back()
  )

  return (
    <>
      <button
        className={`text-error ${className}`}
        onClick={() => setPrompt(true)}
      >
        <FiTrash2 />
        <span>Delete</span>
      </button>

      <Prompt
        title="Are you sure?"
        description="All the flashcards associated to this notebook will be deleted too."
        actionTitle="Delete"
        actionType="error"
        action={deleteHandler}
        isOpen={prompt}
        dismiss={() => setPrompt(false)}
      />
    </>
  )
}
