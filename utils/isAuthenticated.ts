import { firebaseAdmin } from "@/config/firebaseAdmin"
import cookie from "cookie"

export async function isAuthenticated(req: any) {
  const requestHeaders = new Headers(req.headers)

  let token = null

  if (requestHeaders.get("authorization")) {
    token = requestHeaders.get("authorization")?.split(" ")[1]
  }

  if (requestHeaders.get("cookie")) {
    const { auth_token } = cookie.parse(requestHeaders.get("cookie") || "")
    token = auth_token
  }

  if (!token) {
    return null
  }

  try {
    const user = await firebaseAdmin.auth().verifyIdToken(token)

    return user.uid
  } catch (error) {
    return null
  }
}
