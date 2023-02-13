import { customFetch } from "@/utils/customFetch"
import { Notebook } from "@/libs/types"

export const createNotebook = async (
  url: string | [string, string],
  { arg }: { arg: Notebook }
) =>
  await customFetch(url, {
    method: "POST",
    bodyData: arg,
  })

export const addToNotebook = async (notebookId: string, content: string) =>
  await customFetch(`api/notebook/add-content?id=${notebookId}`, {
    method: "PUT",
    bodyData: content,
  })

// export const deleteProject = async (projectId: string) =>
//   await customFetch(`${projectKey(projectId)}/delete`, 'DELETE')
