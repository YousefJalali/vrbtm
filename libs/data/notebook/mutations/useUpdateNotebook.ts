import useSWRMutation from "swr/mutation"
import { Notebook } from "@/libs/types"
import { updateNotebook } from "../actions"

export function useUpdateNotebook() {
  const { trigger, error } = useSWRMutation("/api/notebooks", updateNotebook)

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
      onSuccess: () => {
        if (callback) {
          callback()
        }
      },
    })
  }

  return { onSubmit, error }
}
