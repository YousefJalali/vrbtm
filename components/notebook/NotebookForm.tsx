import { notebookValidation } from "@/utils/validations"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ObjectID from "bson-objectid"
import { useEffect, useMemo } from "react"
import { Notebook } from "@/libs/types"
import ColorInput from "@/libs/ui/color-input/ColorInput"
import { addServerErrors } from "@/utils"

const initialValues = () =>
  ({
    id: ObjectID().toHexString(),
    title: "",
    color:
      "#" +
      Math.floor(Math.random() * (0xffffff + 1))
        .toString(16)
        .padStart(6, "0"),
    description: "",
    content: "",
    userId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Notebook)

export default function NotebookForm({
  id,
  type = "create",
  onSubmit,
  onCancel,
  error,
  reset,
  loading,
  defaultValues,
  ...props
}: {
  id: string
  type?: "create" | "edit"
  onSubmit: (data: Notebook, callback?: () => void) => void
  onCancel?: () => void
  error: any
  reset: () => void
  loading?: boolean
  defaultValues?: Notebook
}) {
  const cancelHandler = () => {
    if (onCancel) {
      reset()
      onCancel()
    }

    if (type === "edit") {
      resetForm(defaultValues)
    }
    if (type === "create") {
      resetForm(initialValues())
    }
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset: resetForm,
    clearErrors,
  } = useForm<Notebook>({
    defaultValues: useMemo(
      () => defaultValues || initialValues(),
      [defaultValues]
    ),
    resolver: yupResolver(notebookValidation),
  })

  //show error in form
  useEffect(() => {
    if (error) {
      if (error.hasOwnProperty("validationErrors")) {
        addServerErrors(error.validationErrors, setError)
      }
    }

    return () => {
      clearErrors()
    }
  }, [error, setError, clearErrors])

  const submitHandler = (data: Notebook) => {
    onSubmit({ ...initialValues(), ...data }, cancelHandler)
  }

  const titleError = errors?.title?.message || ""

  return (
    <form className="prose space-y-2" onSubmit={handleSubmit(submitHandler)}>
      <h3 className="mb-4 text-lg font-bold">
        {type === "create" ? "New" : "Update"} Notebook
      </h3>

      <div className="flex space-x-2">
        <div className="form-control w-full">
          <label htmlFor="title" className="label">
            <span className="label-text">Title</span>
          </label>

          <input
            id="title"
            type="text"
            placeholder="Title..."
            className={`input-bordered input w-full ${
              errors?.title ? "input-error" : ""
            }`}
            {...register("title")}
          />

          <label className="label">
            <span className="label-text-alt text-error">{titleError}</span>
          </label>
        </div>

        <div className="form-control">
          <label htmlFor="title" className="label invisible">
            <span className="label-text">Color</span>
          </label>
          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, value } }) => (
              <ColorInput
                color={value}
                onChange={(color) => onChange(color.hex)}
              />
            )}
          />
        </div>
      </div>

      <div className="form-control">
        <label htmlFor="description" className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          id="description"
          placeholder="A brief about the notebook..."
          className="textarea-bordered textarea h-24"
          {...register("description")}
        ></textarea>
      </div>

      <div className="modal-action">
        <button className="btn-ghost btn" onClick={cancelHandler}>
          Cancel
        </button>
        <button
          type="submit"
          className={`btn-primary btn ${loading ? "loading" : ""}`}
        >
          {type === "create" ? "Create" : "Update"}
        </button>
      </div>
    </form>
  )
}
