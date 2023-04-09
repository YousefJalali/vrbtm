import useSWRMutation from "swr/mutation"
import { Notebook } from "@/libs/types"
import { updateNotebook } from "../actions"
import { useNotification } from "@/libs/hooks"
import { getErrorMessage } from "@/utils"

export function useUpdateNotebook(query: string = "") {
  const { trigger, error, isMutating, reset } = useSWRMutation(
    `/api/notebooks${query ? `?q=${query}` : ""}`,
    updateNotebook
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Notebook,
    callback?: (action?: any) => void
  ) => {
    trigger(formData, {
      optimisticData: ({ data: notebooks }: { data: Notebook[] }) => ({
        data: notebooks.map((notebook) =>
          notebook.id === formData.id
            ? {
                ...notebook,
                title: formData.title,
                description: formData.description,
                color: formData.color,
              }
            : notebook
        ),
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
          message: "notebook updated!",
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
