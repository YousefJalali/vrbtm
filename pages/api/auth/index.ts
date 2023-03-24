import { User } from "@/libs/types"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/libs/db/prisma"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: User
    error?: Error | unknown
    validationErrors?: Error | unknown
  }>
) => {
  const { method, body } = req

  switch (method) {
    //get user by uid
    case "GET":
      const { uid } = req.query
      if (!uid || typeof uid !== "string")
        return res.status(400).json({ error: "unsupported type" })

      try {
        const user = await prisma.user.findFirst({
          where: { uid },
        })

        if (!user) {
          return res.status(404).json({ error: "user not found" })
        }

        return res.status(200).json({ data: user })
      } catch (error) {
        return res.status(500).json({ error })
      }

      break

    //create user
    case "POST":
      try {
        const { uid } = body
        const newUser = await prisma.user.create({
          data: {
            uid,
          },
        })
        return res.status(200).json({ data: newUser })
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Error while creating user in DB" })
      }

      break

    //get user
    case "PUT":
      try {
        const { uid } = body

        if (!uid || typeof uid !== "string")
          return res.status(400).json({ error: "unsupported type" })

        const existingUser = await prisma.user.findFirst({
          where: {
            uid,
          },
        })

        if (!existingUser) {
          return res.status(404).json({ error: "User not found" })
        }

        res.status(200).json({ data: existingUser })
      } catch (error: any) {
        return res
          .status(500)
          .json({ error: "Error while fetching user from DB" })
      }

      break

    default:
      res.status(405).end()
      break
  }
}

export default handler
