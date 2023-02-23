import useSWRMutation from "swr/mutation"

import { addToNotebook } from "../actions"
import { Notebook } from "@/libs/types"
import { useNotification } from "@/libs/hooks/useNotification"

export const useUpdateNotebookContent = (
  notebookId: string | null,
  query: "concat" | "replace" = "concat",
  callback?: (action?: any) => void
) => {
  const { trigger, error, isMutating } = useSWRMutation(
    notebookId ? ["/api/notebooks", `/${notebookId}`] : null,
    (url, arg) => addToNotebook([url.join(""), `?type=${query}`], arg)
  )

  const { setNotification } = useNotification()

  const onSubmit = async (content: string) => {
    trigger(content, {
      optimisticData: ({ data: notebook }: { data: Notebook }) => ({
        data: {
          ...notebook,
          content:
            query === "concat" ? notebook.content.concat(content) : content,
        },
      }),
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
