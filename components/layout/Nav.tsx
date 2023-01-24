export default function Nav() {
  return (
    <div className="mt-4 mb-4 rounded-lg bg-base-200 p-3">
      <ul className="space-y-4">
        <li>
          <div>
            <div className="relative flex pt-1">
              <label htmlFor="customRange1" className="form-label">
                Difficulty
              </label>
              {/* <input
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.valueAsNumber)}
            type="range"
            className="form-range  h-6  w-full  appearance-none  bg-transparent  p-0  focus:shadow-none focus:outline-none focus:ring-0"
            id="customRange1"
          /> */}
            </div>
          </div>
        </li>
        <li>Word length</li>
        <li>Word length</li>
        <li>Word length</li>
      </ul>
    </div>
  )
}
