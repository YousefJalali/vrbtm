import useSWRMutation from "swr/mutation"

import { addToNotebook } from "../actions"
import { Notebook } from "@/libs/types"
import { useNotification } from "@/libs/hooks/useNotification"
import { getErrorMessage } from "@/utils"

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
        setNotification({
          message: getErrorMessage(error),
          variant: "error",
        })
      },
      onSuccess: () => {
        setNotification({
          message:
            query === "concat"
              ? "Content added to notebook!"
              : "Content updated!",
          variant: "success",
          link: query === "concat" ? `/notebooks/${notebookId}` : undefined,
        })
      },
    })

    if (callback) {
      callback()
    }
  }

  return { onSubmit, isMutating }
}
