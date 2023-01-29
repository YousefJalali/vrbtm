export default function Notebooks() {
  return (
    <main>
      <input
        type="text"
        placeholder="Search..."
        className="input-bordered input w-full "
      />

      <ul className="mt-6 space-y-6">
        <li>
          <div className=" card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Law</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </li>
        <li>
          <div className=" card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
          </div>
        </li>
      </ul>
    </main>
  )
}
