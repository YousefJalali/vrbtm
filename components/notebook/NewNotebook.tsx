import { useCreateNotebook } from "@/libs/data/mutations"
import Modal from "@/libs/ui/modal/Modal"
import { notebookValidation } from "@/utils/validations"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import ObjectID from "bson-objectid"
import { useEffect, useRef } from "react"
import { NotebookType } from "@/libs/types"

export default function NewNotebook() {
  const modalLabelRef = useRef<HTMLLabelElement>(null)

  const closeModal = () => {
    if (modalLabelRef.current) {
      //close modal
      modalLabelRef.current.click()

      //reset form
      reset()
    }
  }

  const { onSubmit, error } = useCreateNotebook(closeModal)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<NotebookType>({
    defaultValues: {
      id: ObjectID().toHexString(),
      title: "",
      description: "",
      content: "",
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    resolver: yupResolver(notebookValidation),
  })

  //show error in form
  useEffect(() => {
    if (error && error.message.includes("form-title")) {
      setError("title", {
        type: "custom",
        message: error.message.replace("form-title:", ""),
      })
    }
  }, [error])

  const submitHandler = (data: NotebookType) => {
    onSubmit(data)
  }

  return (
    <Modal id="new-notebook-modal">
      <h3 className="mb-4 text-lg font-bold">New Notebook</h3>

      <form className="space-y-2" onSubmit={handleSubmit(submitHandler)}>
        <div className="form-control w-full ">
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
            <span className="label-text-alt text-error">
              {errors?.title?.message}
            </span>
          </label>
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
          <label
            ref={modalLabelRef}
            htmlFor="new-notebook-modal"
            className="btn-ghost btn"
          >
            Cancel
          </label>
          <button type="submit" className={`btn-primary btn`}>
            create
          </button>
        </div>
      </form>
    </Modal>
  )
}
