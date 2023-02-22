import useSWRMutation from "swr/mutation"
import { Notebook } from "@/libs/types"
import { deleteNotebook } from "../actions"
import { useNotification } from "@/libs/hooks/useNotification"
import { getErrorMessage } from "@/utils"

export const useDeleteNotebook = (
  notebookId: string | null,
  query: string = "",
  callback?: (action?: any) => void
) => {
  const { trigger, error } = useSWRMutation(
    notebookId ? `/api/notebooks${query ? `?q=${query}` : ""}` : null,
    (url, arg) => deleteNotebook([url, `&id=${notebookId}`], arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async () => {
    // trigger()
    trigger(null, {
      optimisticData: ({ data: notebooks }: { data: Notebook[] }) => ({
        data: notebooks.filter((notebook) => notebook.id !== notebookId),
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
          message: "notebook deleted!",
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

export default useDeleteNotebook
