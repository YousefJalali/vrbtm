import { useState } from "react"
import useSWRMutation from "swr/mutation"
import pick from "lodash.pick"
import { Notebook } from "@/libs/types"
import { createNotebook } from "../actions"

export const useCreateNotebook = (callback?: (action?: any) => void) => {
  const { trigger, error } = useSWRMutation(
    ["/api/notebook", "?q=list"],
    createNotebook
  )

  const onSubmit = async (formData: Notebook) => {
    const newNotebook = pick(formData, ["id", "title"])

    trigger(formData, {
      optimisticData: (notebooks: Notebook[]) => ({
        ...notebooks,
        newNotebook,
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

export default useCreateNotebook
