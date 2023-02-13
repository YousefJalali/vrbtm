import { Notebook } from "@/libs/types"
import ObjectID from "bson-objectid"
import { useRouter } from "next/router"

// import { useNotification } from '@the-planner/hooks'
// import { ProjectType, ProjectWithTasksAndCount } from '@the-planner/types'
// import { getErrorMessage } from '@the-planner/utils'

import { addToNotebook } from "../actions"
// import { useInfiniteProjects, useProjects } from '../query'

export const useAddToNotebook = (callback?: (action?: any) => void) => {
  // const { setNotification } = useNotification()

  const router = useRouter()
  const { pathname } = router

  // const { mutate: mutateInfiniteProjects, projects: infiniteProjects } =
  //   useInfiniteProjects()
  // const { mutate: mutateProjects, projects } = useProjects()

  const onSubmit = async (id: string, content: string) => {
    // {
    //   ...formData,
    //   id: ObjectID().toHexString(),
    // }

    const request = async () => {
      try {
        const {
          data: createdProject,
          error,
          validationErrors,
        } = await addToNotebook(id, content)

        // if (validationErrors) {
        //   showForm(notebookFormData, validationErrors)
        //   return null
        // }

        if (error) {
          throw new Error(error)
        }

        // setNotification({
        //   id: uniqueId(),
        //   message: 'project created!',
        //   variant: 'confirmation',
        // })

        return createdProject
      } catch (error) {
        console.log(error)
        // setNotification({
        //   id: uniqueId(),
        //   message: getErrorMessage(error),
        //   variant: 'critical',
        //   // action: 'try again',
        //   // actionFn: () => showForm(notebookFormData),
        // })
      }
    }

    // if (pathname === '/projects') {
    //   await request()
    //   mutateInfiniteProjects()
    // } else {
    //   const updatedProjects = {
    //     data: [{ ...notebookFormData }, ...projects],
    //   }

    //   mutateProjects(
    //     async () => {
    //       const createdProject = await request()

    //       return {
    //         data: createdProject ? [createdProject, ...projects] : projects,
    //       }
    //     },
    //     {
    //       optimisticData: updatedProjects,
    //       rollbackOnError: true,
    //     }
    //   )
    // }

    await request()

    if (callback) {
      callback()
    }
  }

  return { onSubmit }
}

export default useAddToNotebook
