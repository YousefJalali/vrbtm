import useSWRMutation from "swr/mutation"
import { Notebook } from "@/libs/types"
import { deleteNotebook } from "../actions"
import { useNotification } from "@/libs/hooks/useNotification"

export const useDeleteNotebook = (
  notebookId: string | null,
  callback?: (action?: any) => void
) => {
  const { trigger, error } = useSWRMutation(
    notebookId ? "/api/notebooks" : null,
    (url, arg) => deleteNotebook([url, `/${notebookId}`], arg)
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