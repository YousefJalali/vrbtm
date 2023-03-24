export async function customFetch<T>(
  url: string | [string, string],
  {
    method = "GET",
    bodyData,
    token,
  }: {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    bodyData?: T
    token?: string
  }
) {
  const requestHeaders = { "Content-Type": "application/json" }

  const res = await fetch(typeof url === "string" ? url : url.join(""), {
    method,
    ...(bodyData && { body: JSON.stringify(bodyData) }),
    headers: {
      ...requestHeaders,
      ...(token && { Authorization: `Bearer ${token}` }),
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
