import { useUser } from "@/libs/contexts/AuthCtx"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [router, user])
  return <div>{user ? children : null}</div>
}

export default ProtectedRoute
