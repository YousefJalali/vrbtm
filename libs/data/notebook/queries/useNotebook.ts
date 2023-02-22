import useSWR from "swr"
import { customFetch, getErrorMessage } from "@/utils"
import { Notebook } from "@/libs/types"

export const useNotebook = (id?: string) => {
  const url = `/api/notebooks`
  const path = `/${id}`
  const { data, error, mutate } = useSWR([url, path], (url) =>
    customFetch(url, {})
  )

  const notebook: Notebook = data?.data || null
  const isLoading = !error && !data

  return { notebook, mutate, error: getErrorMessage(error), isLoading }
}

export default useNotebook
