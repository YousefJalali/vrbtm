import useSWR from "swr"
import { customFetch, getErrorMessage } from "@/utils"
import { Notebook } from "@prisma/client"

export const useNotebooks = (query?: string) => {
  const key = `/api/notebook`
  const queryParams = `?q=${query}`
  const { data, error, mutate } = useSWR([key, queryParams], (key) =>
    customFetch(key, {})
  )

  const notebooks: Notebook[] = data?.data || []
  const isLoading = !error && !data

  return { notebooks, mutate, error: getErrorMessage(error), isLoading }
}

export default useNotebooks
