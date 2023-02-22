import useSWRMutation from "swr/mutation"
import { Flashcard } from "@/libs/types"
import { createFlashcard } from "../actions"
import { useNotification } from "@/libs/hooks/useNotification"

export const useCreateFlashcard = () => {
  const { trigger, error } = useSWRMutation("/api/flashcards", createFlashcard)

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Flashcard,
    callback?: (action?: any) => void
  ) => {
    trigger(formData, {
      optimisticData: (flashcards: Flashcard[]) => ({
        ...flashcards,
        formData,
      }),
      rollbackOnError: true,
      throwOnError: false,
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

  return { onSubmit, error }
}

export default useCreateFlashcard
