import useSWR from "swr"
import { customFetch, getErrorMessage } from "@/utils"
import { Notebook } from "@/libs/types"

export const useNotebook = <T = Notebook>(id?: string, query: string = "") => {
  const url = `/api/notebooks`
  const path = `/${id}${query ? `?q=${query}` : ""}`

  const { data, error, mutate } = useSWR([url, path], (url) =>
    customFetch(url, {})
  )

  const notebook: T = data?.data || null
  const isLoading = !error && !data

  return { notebook, mutate, error: getErrorMessage(error), isLoading }
}

export default useNotebook
