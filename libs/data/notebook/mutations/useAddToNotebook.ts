import useSWRMutation from "swr/mutation"

import { addToNotebook } from "../actions"
import { Notebook } from "@/libs/types"
import { useNotification } from "@/libs/hooks/useNotification"

export const useAddToNotebook = (
  notebookId: string | null,
  callback?: (action?: any) => void
) => {
  const { trigger, error, isMutating } = useSWRMutation(
    notebookId ? ["/api/notebooks", `/${notebookId}`] : null,
    (url, arg) => addToNotebook([url.join(""), `?type=add`], arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async (content: string) => {
    trigger(content, {
      optimisticData: (data: { data: Notebook }) => {
        if (!data) return

        const { data: notebook } = data

        return {
          ...notebook,
          content: notebook.content.concat(content),
        }
      },
      rollbackOnError: true,
      throwOnError: false,
      onError: (error) => {
        console.log("error", error)
      },
      onSuccess: () => {
        setNotification({
          message: "Content added to notebook!",
          variant: "success",
          link: `/notebooks/${notebookId}`,
        })

        if (callback) {
          callback()
        }
      },
    })
  }

  return { onSubmit, isMutating }
}
