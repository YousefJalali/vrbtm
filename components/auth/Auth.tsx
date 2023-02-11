import { useState } from "react"
import Login from "./Login"
import SignUp from "./SignUp"

export default function Auth({ login = false }: { login: boolean }) {
  const [isLogin, setLogin] = useState(login)

  console.log(isLogin)
  return (
    <>
      {isLogin ? (
        <>
          <Login />

          <span className="label justify-start ">
            You dont an account?
            <a
              className="px-1 text-primary underline"
              onClick={() => setLogin(false)}
            >
              Sign up
            </a>
          </span>
        </>
      ) : (
        <>
          <SignUp />
          <span className="label justify-start ">
            Already have an account?
            <a
              className="px-1 text-primary underline"
              onClick={() => setLogin(true)}
            >
              Login
            </a>
          </span>
        </>
      )}
    </>
  )
}
