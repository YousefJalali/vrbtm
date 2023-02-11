export default function Login() {
  return (
    <form className="prose space-y-4">
      <h2>Login</h2>

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
          login
        </button>
      </div>
    </form>
  )
}
