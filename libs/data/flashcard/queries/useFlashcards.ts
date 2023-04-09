import useSWR from "swr"
import { customFetch, getErrorMessage } from "@/utils"
import { FlashcardWithNotebook } from "@/libs/types"

export const useFlashcards = (notebookId?: string) => {
  const { data, error, mutate } = useSWR("/api/flashcards", (url) =>
    customFetch([url, `?notebookId=${notebookId}`], {})
  )

  const flashcardsWithNotebook: FlashcardWithNotebook[] = data?.data || []
  const isLoading = !error && !data

  return {
    flashcardsWithNotebook,
    mutate,
    error: getErrorMessage(error),
    isLoading,
  }
}

export default useFlashcards
