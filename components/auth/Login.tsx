import { getUser } from "@/libs/data/user/actions"
import { LoginUserType } from "@/libs/types"
import { loginValidation } from "@/utils/validations"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Login() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginUserType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidation),
  })

  const submitHandler = async (data: LoginUserType) => {
    setLoading(true)
    const { data: loggedUser, validationErrors } = await getUser({
      email: data.email,
      password: data.password,
    })
    setLoading(false)

    if (loggedUser) {
      if (router.pathname === "/login") {
        router.push("/")
      }
    }

    if (validationErrors) {
      switch (validationErrors) {
        case "auth/invalid-email":
          setError("email", {
            type: "manual",
            message: "Invalid Email!",
          })
          break
        case "auth/user-not-found":
          setError("email", { type: "manual", message: "Email not found!" })
          break
        case "auth/wrong-password":
          setError("password", {
            type: "manual",
            message: "Wrong password!",
          })
          break

        default:
          break
      }
    }
  }

  return (
    <form className="prose lg:max-w-lg" onSubmit={handleSubmit(submitHandler)}>
      <fieldset disabled={loading} className="space-y-4">
        <div className="form-control w-full ">
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
          <label className={`label ${!errors?.email?.message ? "hidden" : ""}`}>
            <span className="label-text-alt text-error first-letter:uppercase">
              {errors?.email?.message}
            </span>
          </label>
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Password</span>
            <span className="label-text-alt">
              <Link href="/forgot-password">Forgot password?</Link>
            </span>
          </label>
          <input
            type="password"
            placeholder="••••••"
            className={`input-bordered input w-full ${
              errors?.password?.message ? "input-error" : ""
            }`}
            {...register("password")}
          />
          <label
            className={`label ${!errors?.password?.message ? "hidden" : ""}`}
          >
            <span className="label-text-alt text-error first-letter:uppercase">
              {errors?.password?.message}
            </span>
          </label>
        </div>

        <div className="form-control w-full ">
          <button
            className={`btn-primary btn ${loading ? "loading" : ""}`}
            type="submit"
          >
            login
          </button>
        </div>
      </fieldset>
    </form>
  )
}
