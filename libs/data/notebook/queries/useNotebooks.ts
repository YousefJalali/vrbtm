import useSWR from "swr"
import { customFetch, getErrorMessage } from "@/utils"
import { Notebook } from "@/libs/types"

export const useNotebooks = <T = Notebook[]>(query: string = "") => {
  const url = `/api/notebooks` + `${query ? `?q=${query}` : ""}`
  const { data, error, mutate } = useSWR(url, (url) => customFetch(url, {}))

  const isLoading = !error && !data
  const notebooks: T = data?.data || []

  return { notebooks, mutate, error: getErrorMessage(error), isLoading }
}

export default useNotebooks
