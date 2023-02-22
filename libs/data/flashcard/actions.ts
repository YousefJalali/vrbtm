import { customFetch } from "@/utils/customFetch"
import { Flashcard } from "@/libs/types"

export const createFlashcard = async (
  url: string | [string, string],
  { arg }: { arg: Flashcard }
) =>
  await customFetch(url, {
    method: "POST",
    bodyData: arg,
  })

export const updateFlashcard = async (
  url: string | [string, string],
  { arg }: { arg: Flashcard }
) =>
  await customFetch(url, {
    method: "PUT",
    bodyData: arg,
  })

export const deleteFlashcard = async (
  url: string | [string, string],
  { arg }: { arg: string }
) =>
  await customFetch(url, {
    method: "DELETE",
    // bodyData: arg,
  })
