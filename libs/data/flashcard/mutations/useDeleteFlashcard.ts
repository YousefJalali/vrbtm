import useSWRMutation from "swr/mutation"
import { Flashcard } from "@/libs/types"
import { deleteFlashcard } from "../actions"
import { useNotification } from "@/libs/hooks/useNotification"
import { getErrorMessage } from "@/utils"

export const useDeleteFlashcard = (
  flashcardId: string | null,
  notebookId: string = "",
  callback?: (action?: any) => void
) => {
  const { trigger, error } = useSWRMutation(
    flashcardId ? `/api/flashcards` : null,
    (url, arg) =>
      deleteFlashcard([url, `?notebookId=${notebookId}&id=${flashcardId}`], arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async () => {
    trigger(null, {
      optimisticData: ({ data: flashcards }: { data: Flashcard[] }) => ({
        data: flashcards.filter((flashcard) => flashcard.id !== flashcardId),
      }),
      rollbackOnError: true,
      throwOnError: false,
      onError: (error) => {
        setNotification({
          message: getErrorMessage(error),
          variant: "error",
        })
      },
      onSuccess: () => {
        setNotification({
          message: "flashcard deleted!",
          variant: "info",
        })

        if (callback) {
          callback()
        }
      },
    })
  }

  return { onSubmit, error }
}

export default useDeleteFlashcard
