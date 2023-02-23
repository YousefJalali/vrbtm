import { Notebook } from "@/libs/types"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/libs/db/prisma"
import ObjectID from "bson-objectid"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Partial<Notebook>[] | Notebook
    error?: Error | unknown
    nextCursor?: string
    validationErrors?: any
  }>
) => {
  if (req.method === "GET") {
    const { cursor, limit, q } = req.query

    try {
      const notebooks: Partial<Notebook>[] = await prisma.notebook.findMany({
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

      // const notebooks = await prisma.notebook.findMany({
      //   ...(q &&
      //     q !== "undefined" && {
      //       where: {
      //         title: {
      //           contains: q as string,
      //           mode: "insensitive",
      //         },
      //       },
      //     }),

      //   ...(limit &&
      //     limit !== "undefined" && {
      //       take: +limit,
      //     }),

      //   ...(cursor &&
      //     cursor !== "undefined" && {
      //       skip: 1,
      //       cursor: {
      //         id: cursor as string,
      //       },
      //     }),

      //   orderBy: { createdAt: "desc" },

      //   include: {
      //     // flashcards: {
      //     //   select: {
      //     //     status: true,
      //     //   },
      //     // },
      //     _count: {
      //       select: {
      //         flashcards: true,
      //       },
      //     },
      //   },
      // })

      // const nextCursor =
      //   (limit && notebooks[+limit - 1]?.id) ||
      //   notebooks[notebooks.length - 1]?.id

      // return res
      //   .status(200)
      //   .json({ data: notebooks, ...(limit && { nextCursor }) })
      // // .json({ data: notebooks, nextCursor })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }

  if (req.method === "POST") {
    const notebook = req.body

    if (!notebook) {
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
          title: notebook.title.trim().toLowerCase(),
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

      let id = notebook.id
      if (!ObjectID.isValid(id)) {
        console.log("id not valid, new id will be assigned")
        id = ObjectID().toHexString()
      }

      const createdNotebook = await prisma.notebook.create({
        data: {
          ...notebook,
          title: notebook.title.trim().toLowerCase(),
          id,
        },
      })

      res.json({ data: createdNotebook })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  }

  //update notebook
  if (req.method === "PUT") {
    const notebook = req.body

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

      res.json({ data: updatedNotebook })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  }

  if (req.method === "DELETE") {
    const { q, id } = req.query
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
      console.log(error)
      res.status(500).json({ error })
    }
  }
}

export default handler
