export async function customFetch<T>(
  url: string | [string, string],
  {
    method = "GET",
    bodyData,
  }: {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    bodyData?: T
  }
) {
  const headers = { "Content-Type": "application/json" }
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }

  const res = await fetch(typeof url === "string" ? url : url.join(""), {
    method,
    ...(bodyData && { body: JSON.stringify(bodyData) }),
    headers: {
      ...headers,
    },
  })

  // if (res.status === 401) {
  //   logout()
  //   window.location.assign(window.location)
  //   return
  // }

  if (!res.ok) {
    const err = new Error(res.statusText)
    const { error } = await res.json()
    err.message = error
    throw err
    // throw getErrorMessage(err)
  }

  return await res.json()
}

export default customFetch
