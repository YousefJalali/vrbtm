import { customFetch } from "@/utils/customFetch"
import { Notebook } from "@prisma/client"

export const createNotebook = async (notebook: Notebook) =>
  await customFetch(`api/notebook/create`, "POST", notebook)

export const addToNotebook = async (notebookId: string, content: string) =>
  await customFetch(`api/notebook/add-content?id=${notebookId}`, "PUT", content)

// export const deleteProject = async (projectId: string) =>
//   await customFetch(`${projectKey(projectId)}/delete`, 'DELETE')
