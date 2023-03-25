import { auth } from "@/config/firebase"
import { useNotification } from "@/libs/hooks/useNotification"
import { confirmPasswordReset } from "firebase/auth"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormType = {
  password: string
  password2: string
}

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false)
  const { setNotification } = useNotification()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormType>({
    defaultValues: {
      password: "",
      password2: "",
    },
    // resolver: yupResolver(notebookValidation),
  })

  const oobCode = router.query.oobCode

  const submitHandler = async (data: FormType) => {
    if (!oobCode || typeof oobCode !== "string") {
      return
    }

    if (data.password !== data.password2) {
      return setError("password2", {
        type: "manual",
        message: "Passwords are not matching!",
      })
    }
    setLoading(true)

    confirmPasswordReset(auth, oobCode, data.password)
      .then(() => {
        setNotification({
          message: "Your password has been changed successfully",
          variant: "success",
        })
        router.push("/login")
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-action-code":
            setError("password", {
              type: "manual",
              message: "Something is wrong; try again later.",
            })
            break

          default:
            console.log(error)
            break
        }
      })
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-base-200 p-6">
      <div className="mx-auto w-full md:max-w-lg">
        <div className="prose">
          <h1 className="text-center">New password</h1>
          <p className="text-center text-sm opacity-80">
            {
              "Don't worry, we've got you covered. Please enter your email to reset your password."
            }
          </p>
        </div>

        <div className="mt-8 rounded-xl bg-base-100 p-6 shadow">
          <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••"
                className={`error input-bordered input w-full ${
                  errors?.password?.message ? "input-error" : ""
                }`}
                {...register("password")}
              />
              <label
                className={`label ${
                  !errors?.password?.message ? "hidden" : ""
                }`}
              >
                <span className="label-text-alt text-error">
                  {errors?.password?.message}
                </span>
              </label>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••"
                className={`error input-bordered input w-full ${
                  errors?.password2?.message ? "input-error" : ""
                }`}
                {...register("password2")}
              />
              <label
                className={`label ${
                  !errors?.password2?.message ? "hidden" : ""
                }`}
              >
                <span className="label-text-alt text-error">
                  {errors?.password2?.message}
                </span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className={`btn-primary btn-block btn ${
                  loading ? "loading" : ""
                }`}
              >
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
