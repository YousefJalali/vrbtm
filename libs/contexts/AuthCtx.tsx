import React, { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/config/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Cookies from "js-cookie"

const AuthContext = createContext<{
  user: any | null
  isLoading: boolean
}>({
  user: null,
  isLoading: true,
})

export const useUser = () => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<any | null>(null)
  const [isLoading, setLoading] = useState(true)

  // Function to refresh the token in the cookie every 10 minutes
  const refreshToken = () => {
    const userToken = Cookies.get("auth_token")
    if (userToken) {
      auth.currentUser
        ?.getIdToken(true)
        .then((token) => {
          Cookies.set("auth_token", token, { expires: 7 })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        Cookies.set("auth_token", await user.getIdToken(), { expires: 7 })
        setLoading(false)
      } else {
        setUser(null)
        Cookies.remove("auth_token")
        setLoading(false)
      }
    })

    // Timer to refresh the token every 10 minutes
    const timer = setInterval(() => {
      refreshToken()
    }, 10 * 60 * 1000)

    return () => {
      unsubscribe()
      clearInterval(timer)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
