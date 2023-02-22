import { Flashcard } from "@/libs/types"
import { boolean, date, number, object, Schema, string } from "yup"

export const flashcardValidation: Schema<Flashcard> = object({
  id: string().defined(),
  question: string().defined().required("notebook must have a question"),
  answer: string().defined().required("notebook must have a answer"),
  notebookId: string().required(
    "flashcard must be under a notebook, select or create a notebook"
  ),
  notebook: object().nullable(),
  createdAt: date().defined(),
  updatedAt: date().defined(),
})

export default flashcardValidation
