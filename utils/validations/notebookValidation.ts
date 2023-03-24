import { Notebook } from "@/libs/types"
import { boolean, date, number, object, Schema, string } from "yup"

export const notebookValidation: Schema<Notebook> = object({
  id: string().defined(),
  userId: string().defined(),
  title: string().defined().required("notebook must have a title"),
  color: string().defined(),
  description: string().defined(),
  content: string().defined(),
  createdAt: date().defined(),
  updatedAt: date().defined(),
})

export default notebookValidation
