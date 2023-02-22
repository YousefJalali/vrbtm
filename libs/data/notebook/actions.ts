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

export const updateNotebook = async (
  url: string | [string, string],
  { arg }: { arg: Notebook }
) =>
  await customFetch(url, {
    method: "PUT",
    bodyData: arg,
  })

export const addToNotebook = async (
  url: string | [string, string],
  { arg }: { arg: string }
) =>
  await customFetch(url, {
    method: "PUT",
    bodyData: arg,
  })

export const deleteNotebook = async (
  url: string | [string, string],
  { arg }: { arg: string }
) =>
  await customFetch(url, {
    method: "DELETE",
    // bodyData: arg,
  })

// export const deleteProject = async (projectId: string) =>
//   await customFetch(`${projectKey(projectId)}/delete`, 'DELETE')
