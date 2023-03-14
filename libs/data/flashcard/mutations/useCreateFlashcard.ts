import useSWRMutation from "swr/mutation"
import { Flashcard, FlashcardWithNotebook, Notebook } from "@/libs/types"
import { createFlashcard } from "../actions"
import { useNotification } from "@/libs/hooks/useNotification"

export const useCreateFlashcard = (notebookId: string) => {
  const { trigger, error, isMutating } = useSWRMutation(
    "/api/flashcards",
    (url, arg) => createFlashcard([url, `?notebookId=${notebookId}`], arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Flashcard,
    callback?: (action?: any) => void
  ) => {
    trigger(formData, {
      optimisticData: ({
        data: notebookFlashcards,
      }: {
        data: FlashcardWithNotebook[]
      }) => {
        if (notebookFlashcards.length > 0) {
          return {
            data: [
              {
                ...formData,
                notebook: {
                  id: notebookFlashcards[0].notebook.id,
                  title: notebookFlashcards[0].notebook.title,
                  color: notebookFlashcards[0].notebook.color,
                },
              },
              ...notebookFlashcards,
            ],
          }
        }
        return { data: notebookFlashcards }
      },
      rollbackOnError: true,
      throwOnError: false,
      onError: (err) => {
        console.log(err)
      },
      onSuccess: () => {
        setNotification({
          message: "flashcard created!",
          variant: "success",
        })

        if (callback) {
          callback()
        }
      },
    })
  }

  return { onSubmit, error, isMutating }
}

export default useCreateFlashcard
