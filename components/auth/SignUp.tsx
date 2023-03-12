export default function SignUp() {
  return (
    <form className="prose space-y-4">
      <h1>Create a free account!</h1>

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Full name</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input
          type="text"
          placeholder="john doe"
          className="input-bordered input w-full "
        />
      </div>

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Email address</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input
          type="text"
          placeholder="johndoe@example.com"
          className="input-bordered input w-full "
        />
        {/* <label className="label">
          <span className="label-text-alt">Use your email</span>
        </label> */}
      </div>

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Password</span>
          {/* <span className="label-text-alt">Alt label</span> */}
        </label>
        <input
          type="password"
          placeholder="••••••"
          className="input-bordered input w-full "
        />
      </div>

      <div className="form-control w-full ">
        <button className="btn-primary btn" type="submit">
          Sign up
        </button>
      </div>
    </form>
  )
}
