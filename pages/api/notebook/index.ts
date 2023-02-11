import { Notebook } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/libs/db/prisma"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Partial<Notebook>[]
    error?: Error | unknown
    nextCursor?: string
  }>
) => {
  const { cursor, limit, q } = req.query

  try {
    if (q === "list") {
      const notebooks: Partial<Notebook>[] = await prisma.notebook.findMany({
        select: {
          id: true,
          title: true,
        },
        orderBy: { createdAt: "desc" },
      })

      return res.status(200).json({ data: notebooks })
    }

    const notebooks = await prisma.notebook.findMany({
      ...(q &&
        q !== "undefined" && {
          where: {
            title: {
              contains: q as string,
              mode: "insensitive",
            },
          },
        }),

      ...(limit &&
        limit !== "undefined" && {
          take: +limit,
        }),

      ...(cursor &&
        cursor !== "undefined" && {
          skip: 1,
          cursor: {
            id: cursor as string,
          },
        }),

      orderBy: { createdAt: "desc" },

      include: {
        // flashcards: {
        //   select: {
        //     status: true,
        //   },
        // },
        _count: {
          select: {
            flashcards: true,
          },
        },
      },
    })

    const nextCursor =
      (limit && notebooks[+limit - 1]?.id) ||
      notebooks[notebooks.length - 1]?.id

    return res
      .status(200)
      .json({ data: notebooks, ...(limit && { nextCursor }) })
    // .json({ data: notebooks, nextCursor })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
