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

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Question</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input w-full "
          {...register("question")}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Answer</span>
        </label>
        <textarea
          className="textarea-bordered textarea h-24"
          placeholder="Bio"
          {...register("answer")}
        ></textarea>
      </div>

      <div className="modal-action">
        <button className="btn-ghost btn" onClick={cancelHandler}>
          Cancel
        </button>
        <button className={`btn-primary btn ${loading ? "loading" : ""}`}>
          {type === "create" ? "create" : "Update"}
        </button>
      </div>
    </form>
  )
}
