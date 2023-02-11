import { Notebook } from "@prisma/client"
import { boolean, date, number, object, Schema, string } from "yup"

export const notebookValidation: Schema<Notebook> = object({
  id: string().defined(),
  title: string().defined().required("notebook must have a title"),
  description: string().defined(),
  content: string().defined(),
  createdAt: date().defined(),
  updatedAt: date().defined(),
})

export default notebookValidation
