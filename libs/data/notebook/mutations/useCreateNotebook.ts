import useSWRMutation from "swr/mutation"
import { Notebook } from "@/libs/types"
import { createNotebook } from "../actions"
import { useNotification } from "@/libs/hooks/useNotification"

export const useCreateNotebook = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    "/api/notebooks",
    createNotebook
  )

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: Notebook,
    callback?: (action?: any) => void
  ) => {
    trigger(formData, {
      optimisticData: (notebooks: Notebook[]) => ({
        ...notebooks,
        formData,
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
