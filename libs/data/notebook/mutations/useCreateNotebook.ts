import useSWRMutation from "swr/mutation"
import { Notebook } from "@/libs/types"
import { createNotebook } from "../actions"
import { useNotification } from "@/libs/hooks/useNotification"
import { getErrorMessage } from "@/utils"
import Cookie from "js-cookie"

export const useCreateNotebook = (query: string = "") => {
  const { trigger, error, isMutating, reset } = useSWRMutation(
    `/api/notebooks${query ? `?q=${query}` : ""}`,
    // (url, arg) => createNotebook(url, arg, Cookie.get("auth_token") || "")
    createNotebook
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Notebook,
    callback?: (action?: any) => void
  ) => {
    console.log(formData)
    trigger(formData, {
      optimisticData: ({ data: notebooks }: { data: Notebook[] }) => ({
        data: [
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
          ...notebooks,
        ],
      }),
      rollbackOnError: true,
      throwOnError: false,
      onError: (error) => {
        if (error.hasOwnProperty("error")) {
          getErrorMessage(error.error).replace("{}", "") &&
            setNotification({
              message: getErrorMessage(error.error),
              variant: "error",
            })
        }
      },
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

  return { onSubmit, error, isMutating, reset }
}

export default useCreateNotebook
