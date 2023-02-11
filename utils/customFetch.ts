// function logout() {
//   window.localStorage.removeItem(localStorageKey)
// }

export async function customFetch<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  bodyData?: T
) {
  // const token = window.localStorage.getItem(localStorageKey)
  const headers = { "Content-Type": "application/json" }
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }

  const res = await fetch(url, {
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
