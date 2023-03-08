import useSWR from "swr"
import { customFetch, getErrorMessage } from "@/utils"
import { Flashcard, FlashcardWithNotebook } from "@/libs/types"

export const useFlashcards = (notebookId?: string) => {
  const { data, error, mutate } = useSWR(
    ["/api/flashcards", `?notebookId=${notebookId}`],
    (url) => customFetch(url, {})
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
