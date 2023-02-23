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
    const error = new Error(res.statusText)
    const { error: err, validationErrors } = await res.json()

    error.message = err
    throw { error, validationErrors }
  }

  return await res.json()
}

export default customFetch
