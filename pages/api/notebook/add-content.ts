import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/libs/db/prisma"
import { Notebook } from "@prisma/client"
import omit from "lodash.omit"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Notebook
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const { id } = req.query
  const content = req.body
  if (!content || !id || typeof id !== "string") return

  try {
    //check if task exist in DB
    const existedNotebook = await prisma.notebook.findUnique({
      where: { id },
    })
    if (!existedNotebook) {
      return res.status(400).json({ error: "Notebook not found" })
    }

    const notebook = {
      ...existedNotebook,
      content: existedNotebook.content.concat(content),
    }

    //remove project key from task object
    // if (notebookForm.tasks) {
    //   notebook = _.omit(notebookForm, 'tasks') as ProjectType
    // }

    //validate form
    // const validate = await apiYupValidation<ProjectType>(projectSchema, notebook)
    // if (!_.isEmpty(validate.errors)) {
    //   return res.json({ validationErrors: validate.errors })
    // }

    console.log("api", notebook)

    //push updated task
    const updatedNotebook = await prisma.notebook.update({
      where: { id: notebook.id },
      data: omit(notebook, "id"),
      // include: {
      //   tasks: {
      //     include: { project: { select: { title: true, color: true } } },
      //     orderBy: { createdAt: 'desc' },
      //   },
      //   _count: {
      //     select: {
      //       tasks: true,
      //     },
      //   },
      // },
    })

    res.status(200).json({ data: updatedNotebook })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
