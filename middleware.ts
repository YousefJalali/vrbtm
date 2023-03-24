import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
// import { firebaseAdmin } from "@/config/firebaseAdmin"

export async function middleware(req: NextRequest) {
  return NextResponse.next()
  // const requestHeaders = new Headers(req.headers)
  // const token = requestHeaders.get("authorization")?.split(" ")[1]

  // if (token) {
  //   const user = await firebaseAdmin.auth().verifyIdToken(token)
  //   requestHeaders.set("x-user-uid", user.uid)
  //   return NextResponse.next({
  //     request: {
  //       headers: requestHeaders,
  //     },
  //   })
  // } else {
  //   return NextResponse.next()
  // }

  // try {
  //   // if (!req.headers.cookie) throw Error

  //   const auth_token = req.cookies.get("auth_token")
  //   if (!auth_token) throw Error

  //   // const user = await firebaseAdmin.auth().verifyIdToken(auth_token.value)
  //   // if (!user) throw Error

  //   const requestHeaders = new Headers(req.headers)
  //   requestHeaders.set("x-user-uid", "hello")
  //   return NextResponse.next({
  //     request: {
  //       // New request headers
  //       headers: requestHeaders,
  //     },
  //   })
  // } catch (error) {
  //   return new NextResponse(
  //     JSON.stringify({ error: "authentication failed" }),
  //     { status: 401, headers: { "content-type": "application/json" } }
  //   )
  // }
}

export const config = {
  matcher: ["/api/notebooks"],
}
