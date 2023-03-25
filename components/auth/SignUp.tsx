import { CreateUserType } from "@/libs/types"
import { useForm } from "react-hook-form"
import { createUser } from "@/libs/data/user/actions"
import { useRouter } from "next/router"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpValidation } from "@/utils/validations"

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateUserType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signUpValidation),
  })

  const submitHandler = async (data: CreateUserType) => {
    setLoading(true)
    const { data: createdUser, validationErrors } = await createUser(data)
    setLoading(false)

    if (createdUser) {
      if (router.pathname === "/signup") {
        router.push("/")
      }
    }

    if (validationErrors) {
      switch (validationErrors) {
        case "auth/weak-password":
          setError("password", {
            type: "manual",
            message: "Weak password!",
          })
          break
        case "auth/invalid-email":
          setError("email", { type: "manual", message: "Invalid email!" })
          break
        case "auth/email-already-in-use":
          setError("email", {
            type: "manual",
            message: "Email already exists!",
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
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Full name</span>
            {/* <span className="label-text-alt">Alt label</span> */}
          </label>
          <input
            type="text"
            placeholder="john doe"
            className={`error input-bordered input w-full ${
              errors?.name?.message ? "input-error" : ""
            }`}
            {...register("name")}
          />
          <label className={`label ${!errors?.email?.message ? "hidden" : ""}`}>
            <span className="label-text-alt text-error first-letter:uppercase">
              {errors?.name?.message}
            </span>
          </label>
        </div>

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
          <label className={`label ${!errors?.email?.message ? "hidden" : ""}`}>
            <span className="label-text-alt text-error first-letter:uppercase">
              {errors?.email?.message}
            </span>
          </label>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
            {/* <span className="label-text-alt">Alt label</span> */}
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

        <div className="form-control w-full">
          <button
            className={`btn-primary btn ${loading ? "loading" : ""}`}
            type="submit"
          >
            Sign up
          </button>
        </div>
      </fieldset>
    </form>
  )
}
