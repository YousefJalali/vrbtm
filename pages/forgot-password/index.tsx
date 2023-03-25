import { auth } from "@/config/firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormType = {
  email: string
}

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  // const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormType>({
    defaultValues: {
      email: "",
    },
    // resolver: yupResolver(notebookValidation),
  })

  const submitHandler = async (data: FormType) => {
    setLoading(true)
    // const { data: loggedUser, validationErrors } = await getUser({
    //   email: data.email,
    // })
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setSuccess(true)
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/missing-email":
            setError("email", {
              type: "manual",
              message: "Enter your email",
            })
            break
          case "auth/invalid-email":
            setError("email", {
              type: "manual",
              message: "Invalid email!",
            })
            break
          case "auth/user-not-found":
            setError("email", {
              type: "manual",
              message: "Email not found!",
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
          <h1 className="text-center">Forgot your password?</h1>
          <p className="text-center text-sm opacity-80">
            Enter your email and we will send you a link to reset your password.
          </p>
        </div>

        <div className="mt-8 rounded-xl bg-base-100 p-6 shadow">
          <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email address</span>
              </label>
              <input
                type="text"
                placeholder="johndoe@example.com"
                className={`error input-bordered input w-full ${
                  errors?.email?.message ? "input-error" : ""
                }`}
                {...register("email")}
              />
              <label
                className={`label ${!errors?.email?.message ? "hidden" : ""}`}
              >
                <span className="label-text-alt text-error">
                  {errors?.email?.message}
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
                Send Reset Link
              </button>
            </div>

            {success && (
              <div className="mt-6">
                <p className="text-primary">
                  An email has been sent to your address.
                </p>
                <p className="text-sm opacity-80">
                  If you do not see it in your inbox, please check your spam
                  folder.
                </p>
              </div>
            )}

            {/* <div className="mt-6">
              <p className="text-red-500">{error}</p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  )
}
