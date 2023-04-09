import { Notebook } from "@/libs/types"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/libs/db/prisma"
import omit from "lodash.omit"
import { isAuthenticated } from "@/utils/isAuthenticated"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Notebook | null
    error?: Error | unknown
    nextCursor?: string
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
      if (!user) {
        return res.status(401).json({ error: "not authorized" })
      }

      try {
        const { id, q } = req.query
        if (!id || typeof id !== "string") return

        const notebook: Notebook | null = await prisma.notebook.findFirst({
          where: { userId: user.id, id },
          ...(q &&
            q === "with-flashcards" && {
              include: {
                flashcards: true,
                _count: {
                  select: {
                    flashcards: true,
                  },
                },
              },
            }),
        })

        if (!notebook) {
          return res.status(200).json({ error: "No notebook found" })
        }

        return res.status(200).json({ data: notebook })
      } catch (error) {
        return res.status(500).json({ error })
      }
      break

    case "PUT":
      const { type, id } = req.query
      const content = req.body

      if (!user) {
        return res.status(401).json({ error: "not authorized" })
      }

      if (
        !content ||
        !id ||
        typeof id !== "string" ||
        typeof content !== "string"
      )
        return res.status(400).json({ error: "unsupported type" })

      let existedNotebook = null

      try {
        //check if task exist in DB
        existedNotebook = await prisma.notebook.findFirst({
          where: { id, userId: user.id },
        })
      } catch (error) {
        res.status(500).json({ error })
      }

      if (!existedNotebook) {
        return res.status(400).json({ error: "Notebook not found" })
      }

      if (type === "concat") {
        try {
          const notebook = {
            ...existedNotebook,
            content: existedNotebook.content.concat(content),
          }

          //push updated task
          const updatedNotebook = await prisma.notebook.update({
            where: { id: notebook.id },
            data: omit(notebook, "id"),
          })

          res.status(200).json({ data: updatedNotebook })
        } catch (error) {
          res.status(500).json({ error })
        }
      }

      if (type === "replace") {
        try {
          const notebook = {
            ...existedNotebook,
            content: content,
          }

          const updatedNotebook = await prisma.notebook.update({
            where: { id: notebook.id },
            data: omit(notebook, "id"),
          })

          res.status(200).json({ data: updatedNotebook })
        } catch (error) {
          res.status(500).json({ error })
        }
      }
      break

    default:
      res.status(405).end()
      break
  }
}

export default handler
