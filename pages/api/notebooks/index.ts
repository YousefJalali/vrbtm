import { Notebook } from "@/libs/types"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/libs/db/prisma"
import ObjectID from "bson-objectid"
import { isAuthenticated } from "@/utils/isAuthenticated"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Partial<Notebook>[] | Notebook
    error?: Error | unknown
    nextCursor?: string
    validationErrors?: any
  }>
) => {
  let user = null
  const uid = await isAuthenticated(req)
  if (uid) {
    user = await prisma.user.findFirst({
      where: { uid },
    })
  }

  switch (req.method) {
    case "GET":
      try {
        const { cursor, limit, q } = req.query

        if (!user) {
          return res.status(200).json({ data: [] })
        }

        const notebooks: Partial<Notebook>[] = await prisma.notebook.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
          ...(q &&
            q !== "undefined" &&
            (q === "with-flashcards-count" || q === "with-flashcards") && {
              include: {
                ...(q === "with-flashcards" && { flashcards: true }),
                _count: {
                  select: {
                    flashcards: true,
                  },
                },
              },
            }),

          ...(q &&
            q !== "undefined" &&
            q === "list" && {
              select: {
                id: true,
                title: true,
                color: true,
              },
            }),
        })

        return res.status(200).json({ data: notebooks })
      } catch (error) {
        return res.status(500).json({ error })
      }
      break

    case "POST":
      const notebookForm = req.body

      if (!user) {
        return res.status(401).json({ error: "not authorized" })
      }

      if (!notebookForm) {
        return res
          .status(400)
          .json({ error: "Something went wrong, please try again" })
      }

      try {
        //validate form
        // const validate = await apiYupValidation<ProjectType>(projectSchema, project)

        // if (!_.isEmpty(validate.errors)) {
        //   return res.json({ validationErrors: validate.errors })
        // }

        const isTitleExist = await prisma.notebook.findFirst({
          where: {
            title: notebookForm.title.trim().toLowerCase(),
          },
        })

        if (isTitleExist) {
          return res.status(400).json({
            validationErrors: {
              title: {
                type: "required",
                message: "Title already exist!",
              },
            },
          })
        }

        let id = notebookForm.id
        if (!ObjectID.isValid(id)) {
          id = ObjectID().toHexString()
        }

        const createdNotebook = await prisma.notebook.create({
          data: {
            ...notebookForm,
            title: notebookForm.title.trim().toLowerCase(),
            id,
            userId: user.id,
          },
        })

        return res.json({ data: createdNotebook })
      } catch (error) {
        return res.status(400).json({ error })
      }
      break

    case "PUT":
      const notebook = req.body

      if (!user) {
        return res.status(401).json({ error: "not authorized" })
      }

      if (!notebook) {
        return res
          .status(400)
          .json({ error: "Something went wrong, please try again" })
      }

      try {
        const isNotebookExist = await prisma.notebook.findUnique({
          where: {
            id: notebook.id,
          },
        })
        if (!isNotebookExist) {
          return res.status(400).json({ error: "Notebook not found!" })
        }

        const notebookWithSameTitle = await prisma.notebook.findFirst({
          where: {
            title: notebook.title,
          },
        })
        if (notebookWithSameTitle && notebookWithSameTitle.id !== notebook.id) {
          return res
            .status(400)
            .json({ error: "form-title:Title already exist!" })
        }

        const updatedNotebook = await prisma.notebook.update({
          where: { id: notebook.id },
          data: {
            title: notebook.title,
            color: notebook.color,
            description: notebook.description,
          },
        })

        return res.json({ data: updatedNotebook })
      } catch (error) {
        return res.status(400).json({ error })
      }
      break

    case "DELETE":
      const { q, id } = req.query

      if (!user) {
        return res.status(401).json({ error: "not authorized" })
      }

      if (!id || typeof id !== "string") return

      try {
        const deletedNotebook = await prisma.notebook.delete({
          where: { id },
          include: {
            flashcards: {},
          },
        })

        return res.status(200).json({ data: deletedNotebook })
      } catch (error) {
        return res.status(500).json({ error })
      }
      break

    default:
      res.status(405).end()
      break
  }
}

export default handler
