import useSWRMutation from "swr/mutation"
import { Flashcard } from "@/libs/types"
import { updateFlashcard } from "../actions"
import { useNotification } from "@/libs/hooks/useNotification"

export function useUpdateFlashcard(
  flashcardId: string,
  callback?: (action?: any) => void
) {
  const { trigger, error, isMutating, reset } = useSWRMutation(
    "/api/flashcards",
    (url, arg) => updateFlashcard([url, `?id=${flashcardId}`], arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async (formData: Flashcard) => {
    trigger(formData, {
      optimisticData: ({ data: flashcards }: { data: Flashcard[] }) => ({
        data: flashcards.map((flashcard) =>
          flashcard.id === formData.id
            ? {
                ...flashcard,
                answer: formData.answer,
                question: formData.question,
              }
            : flashcard
        ),
      }),
      rollbackOnError: true,
      throwOnError: false,
      onSuccess: () => {
        setNotification({
          message: "flashcard updated!",
          variant: "success",
        })

        if (callback) {
          callback()
        }
      },
    })
  }

  return { onSubmit, error, isMutating, reset }
}
