import useSWRMutation from "swr/mutation"
import { Notebook } from "@/libs/types"
import { createNotebook } from "../actions"
import { useNotification } from "@/libs/hooks/useNotification"

export const useCreateNotebook = (query: string = "") => {
  const { trigger, error, isMutating } = useSWRMutation(
    `/api/notebooks${query ? `?q=${query}` : ""}`,
    createNotebook
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Notebook,
    callback?: (action?: any) => void
  ) => {
    trigger(formData, {
      optimisticData: ({ data: notebooks }: { data: Notebook[] }) => ({
        data: [
          ...notebooks,
          {
            ...(query === "list"
              ? {
                  id: formData.id,
                  title: formData.title,
                  color: formData.color,
                }
              : { ...formData }),

            ...(query === "with-flashcards-count" && {
              _count: { flashcards: 0 },
            }),

            ...(query === "with-flashcards" && {
              flashcards: [],
              _count: { flashcards: 0 },
            }),
          },
        ],
      }),
      rollbackOnError: true,
      throwOnError: false,
      onError: (error) => console.log(error),
      onSuccess: () => {
        setNotification({
          message: "notebook created!",
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

export default useCreateNotebook
