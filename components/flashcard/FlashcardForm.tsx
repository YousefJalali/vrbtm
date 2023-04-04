import { Flashcard } from "@/libs/types"
import { flashcardValidation } from "@/utils/validations"
import { yupResolver } from "@hookform/resolvers/yup"
import ObjectID from "bson-objectid"
import { useForm } from "react-hook-form"

const initialValues = () => ({
  id: ObjectID().toHexString(),
  question: "",
  answer: "",
  notebookId: "",
  updatedAt: new Date(),
  createdAt: new Date(),
})

export default function FlashcardForm({
  id,
  type = "create",
  onSubmit,
  onCancel,
  error,
  loading,
  defaultValues,
}: {
  id: string
  type?: "create" | "edit"
  onSubmit: (data: Flashcard, callback?: () => void) => void
  onCancel?: () => void
  error: any
  loading?: boolean
  defaultValues?: Partial<Flashcard>
}) {
  const cancelHandler = () => {
    if (onCancel) {
      onCancel()
    }

    if (type === "edit") {
      reset({ ...initialValues(), ...defaultValues })
    }
    if (type === "create") {
      reset(initialValues())
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
  } = useForm<Flashcard>({
    defaultValues: { ...initialValues(), ...defaultValues },
    resolver: yupResolver(flashcardValidation),
  })

  const submitHandler = (data: Flashcard) => {
    onSubmit({ ...initialValues(), ...data }, cancelHandler)
  }

  return (
    <form className=" space-y-2" onSubmit={handleSubmit(submitHandler)}>
      <h3 className="mb-4 text-lg font-bold">
        {type === "create" ? "New" : "Update"} Flashcard
      </h3>

      <fieldset disabled={type === "create" && loading}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Question</span>
          </label>
          <textarea
            className={`${
              errors?.question ? "input-error" : ""
            } textarea-bordered textarea h-24`}
            placeholder="Type the question here"
            maxLength={100}
            {...register("question")}
          ></textarea>
          <label className="label">
            <span className="label-text-alt text-error first-letter:uppercase">
              {errors?.question?.message}
            </span>
            <span
              className={`label-text-alt ${
                errors?.question?.message ? "hidden" : ""
              }`}
            >
              {100 - (watch("question")?.length ?? 0)} characters left
            </span>
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Answer</span>
          </label>
          <textarea
            className={`${
              errors?.question ? "input-error" : ""
            } textarea-bordered textarea h-24`}
            placeholder="Type the answer here"
            maxLength={100}
            {...register("answer")}
          ></textarea>
          <label className="label">
            <span className="label-text-alt text-error first-letter:uppercase">
              {errors?.answer?.message}
            </span>
            <span
              className={`label-text-alt ${
                errors?.answer?.message ? "hidden" : ""
              }`}
            >
              {100 - (watch("answer")?.length ?? 0)} characters left
            </span>
          </label>
        </div>

        <div className="modal-action">
          <button
            type="button"
            className="btn-ghost btn"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`btn-primary btn ${loading ? "loading" : ""}`}
          >
            {type === "create" ? "create" : "Update"}
          </button>
        </div>
      </fieldset>
    </form>
  )
}
