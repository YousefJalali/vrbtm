import useSWR from "swr"
import { customFetch, getErrorMessage } from "@/utils"
import { Flashcard, FlashcardWithNotebook } from "@/libs/types"

export const useFlashcards = (query?: string) => {
  const url = `/api/flashcards`
  const { data, error, mutate } = useSWR(url, (url) => customFetch(url, {}))

  const flashcards: FlashcardWithNotebook[] = data?.data || []
  const isLoading = !error && !data

  return { flashcards, mutate, error: getErrorMessage(error), isLoading }
}

export default useFlashcards
