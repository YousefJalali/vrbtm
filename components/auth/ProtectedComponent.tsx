import { useUser } from "@/libs/contexts/AuthCtx"
import { useState } from "react"
import { HiLockClosed } from "react-icons/hi"
import Login from "./Login"
import SignUp from "./SignUp"

export default function ProtectedComponent({
  children,
  dismiss,
}: {
  children: JSX.Element
  dismiss: () => void
}) {
  const [isLogin, setLogin] = useState(false)
  const { user, isLoading } = useUser()

  return isLoading ? (
    <div>Loading...</div>
  ) : user ? (
    <>
      {children}
      {/* {Children.map(children, (child, index) =>
        cloneElement(child, {
          userUid: user.uid,
        })
      )} */}
    </>
  ) : (
    <>
      <button
        className="btn-outline btn-sm btn-circle btn absolute right-2 top-2"
        onClick={dismiss}
      >
        ✕
      </button>
      <div className="flex flex-col items-center justify-center">
        <div className="prose">
          <h3 className="flex items-center justify-center gap-2 text-center leading-none">
            <HiLockClosed className="inline-block" />
            Create Notebook
          </h3>
          <p className="text-center">
            To create a new notebook, you need to have an account. Please log in
            or sign up to start creating your personal notebooks.
          </p>
        </div>
        <div className="divider"></div>
      </div>

      {isLogin && <Login />}
      {!isLogin && <SignUp />}

      <span className="label justify-start ">
        {isLogin ? "You dont an account?" : "Already have an account?"}
        <button
          className="link-primary link ml-1 p-0"
          onClick={() => setLogin((prevState) => !prevState)}
        >
          {isLogin ? "Sign up" : "Login"}
        </button>
      </span>
    </>
  )
}
