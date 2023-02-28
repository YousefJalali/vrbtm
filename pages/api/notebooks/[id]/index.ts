import { Notebook } from "@/libs/types"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/libs/db/prisma"
import ObjectID from "bson-objectid"
import omit from "lodash.omit"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Notebook | null
    error?: Error | unknown
    nextCursor?: string
  }>
) => {
  if (req.method === "GET") {
    const { id } = req.query
    if (!id || typeof id !== "string") return

    try {
      const notebook: Notebook | null = await prisma.notebook.findUnique({
        where: { id },
      })

      if (!notebook) {
        return res.status(200).json({ error: "No notebook found" })
      }

      return res.status(200).json({ data: notebook })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }

  //PUT
  if (req.method === "PUT") {
    const { type } = req.query

    const content = req.body
    const { id } = req.query

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
      existedNotebook = await prisma.notebook.findUnique({
        where: { id },
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
        console.log(error)
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
        console.log(error)
        res.status(500).json({ error })
      }
    }
  }
}

export default handler
