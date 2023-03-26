import AuthLayout from "@/components/layout/AuthLayout"
import { auth } from "@/config/firebase"
import { useNotification } from "@/libs/hooks/useNotification"
import { ForgotPasswordType } from "@/libs/types"
import { isAuthenticated } from "@/utils/isAuthenticated"
import { forgotPasswordValidation } from "@/utils/validations"
import { yupResolver } from "@hookform/resolvers/yup"
import { sendPasswordResetEmail } from "firebase/auth"
import { GetServerSideProps } from "next"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { setNotification } = useNotification()
  // const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(forgotPasswordValidation),
  })

  const submitHandler = async (data: ForgotPasswordType) => {
    setLoading(true)

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
            setNotification({
              message: "Something is wrong; try again later.",
              variant: "error",
            })
            break
        }
      })
    setLoading(false)
  }

  return (
    <AuthLayout>
      <div className="prose text-center">
        <h1>Forgot your password?</h1>
        <p>
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
              <span className="label-text-alt text-error first-letter:uppercase">
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
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await isAuthenticated(req)

  if (user) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
