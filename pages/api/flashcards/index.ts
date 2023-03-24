import { Flashcard } from "@/libs/types"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/libs/db/prisma"
import ObjectID from "bson-objectid"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Partial<Flashcard>[] | Flashcard
    error?: Error | unknown
    nextCursor?: string
    validationErrors?: any
  }>
) => {
  if (req.method === "GET") {
    const { notebookId, q } = req.query

    try {
      const flashcards: Partial<Flashcard>[] = await prisma.flashcard.findMany({
        ...(notebookId &&
          typeof notebookId === "string" && {
            where: {
              notebookId,
            },
          }),
        orderBy: { createdAt: "desc" },
        include: {
          notebook: { select: { id: true, title: true, color: true } },
        },
      })

      return res.status(200).json({ data: flashcards })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  if (req.method === "POST") {
    const flashcard = req.body

    if (!flashcard) {
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

      let id = flashcard.id
      if (!ObjectID.isValid(id)) {
        id = ObjectID().toHexString()
      }

      const createdFlashcard = await prisma.flashcard.create({
        data: {
          ...flashcard,
          id,
        },
      })

      return res.json({ data: createdFlashcard })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  //update flashcard
  if (req.method === "PUT") {
    const flashcard = req.body

    if (!flashcard) {
      return res
        .status(400)
        .json({ error: "Something went wrong, please try again" })
    }

    try {
      const isFlashcardExist = await prisma.flashcard.findUnique({
        where: {
          id: flashcard.id,
        },
      })
      if (!isFlashcardExist) {
        return res.status(400).json({ error: "Flashcard not found!" })
      }

      const updatedFlashcard = await prisma.flashcard.update({
        where: { id: flashcard.id },
        data: {
          question: flashcard.question,
          answer: flashcard.answer,
        },
      })

      return res.json({ data: updatedFlashcard })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  if (req.method === "DELETE") {
    const { id, notebookId } = req.query

    if (!id || typeof id !== "string")
      return res.status(400).json({ error: "unsupported type" })

    try {
      const deletedFlashcard = await prisma.flashcard.delete({
        where: { id },
      })

      return res.status(200).json({ data: deletedFlashcard })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default handler
