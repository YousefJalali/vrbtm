import Modal from "@/libs/ui/modal/Modal"

export default function NewNotebook() {
  return (
    <Modal id="new-notebook-modal">
      <h3 className="mb-4 text-lg font-bold">New Notebook</h3>

      <form className=" space-y-2">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input-bordered input w-full "
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea-bordered textarea h-24"
            placeholder="Bio"
          ></textarea>
        </div>
      </form>

      <div className="modal-action">
        <label htmlFor="new-notebook-modal" className="btn-ghost btn">
          Cancel
        </label>
        <button className="btn-primary btn">create</button>
      </div>
    </Modal>
  )
}
