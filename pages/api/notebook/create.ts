import type { NextApiRequest, NextApiResponse } from "next"
// import { ProjectTasksCount, ProjectType } from '@the-planner/types'
import { prisma } from "@/libs/db/prisma"
import ObjectID from "bson-objectid"
// import { apiYupValidation } from '@the-planner/hooks'
// import { projectSchema } from '@the-planner/utils'
import isEmpty from "lodash.isempty"
import { Notebook } from "@prisma/client"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Notebook
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
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

    let id = notebook.id
    if (!ObjectID.isValid(id)) {
      console.log("id not valid, new id will be assigned")
      id = ObjectID().toHexString()
    }

    const createdNotebook = await prisma.notebook.create({
      data: {
        ...notebook,
        id,
      },
    })

    res.json({ data: createdNotebook })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export default handler
