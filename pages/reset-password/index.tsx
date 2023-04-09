import AuthLayout from "@/components/layout/AuthLayout"
import { auth } from "@/config/firebase"
import { useNotification } from "@/libs/hooks"
import { ResetPasswordType } from "@/libs/types"
import { isAuthenticated } from "@/utils/isAuthenticated"
import { resetPasswordValidation } from "@/utils/validations"
import { yupResolver } from "@hookform/resolvers/yup"
import { confirmPasswordReset } from "firebase/auth"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false)
  const { setNotification } = useNotification()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordType>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(resetPasswordValidation),
  })

  const oobCode = router.query.oobCode

  const submitHandler = async (data: ResetPasswordType) => {
    if (!oobCode || typeof oobCode !== "string") {
      return
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
    <>
      <Head>
        <title>Reset Password | VRBTM</title>
      </Head>
      <AuthLayout>
        <div className="prose text-center">
          <h1>New password</h1>
          <p>
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
                  errors?.confirmPassword?.message ? "input-error" : ""
                }`}
                {...register("confirmPassword")}
              />
              <label
                className={`label ${
                  !errors?.confirmPassword?.message ? "hidden" : ""
                }`}
              >
                <span className="label-text-alt text-error">
                  {errors?.confirmPassword?.message}
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
      </AuthLayout>
    </>
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
