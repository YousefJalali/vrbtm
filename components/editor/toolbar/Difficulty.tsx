import { ChangeEvent, InputHTMLAttributes } from "react"

export default function DifficultyInput({
  difficulty,
  setDifficulty,
  ...props
}: {
  difficulty: number
  setDifficulty: (e: ChangeEvent<HTMLInputElement>) => void
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={`flex h-full space-x-2 rounded-lg bg-base-300 p-2 text-sm leading-none text-base-content`}
    >
      <span className="leading-none text-base-content">Difficulty</span>

      <input
        value={difficulty}
        onChange={setDifficulty}
        type="range"
        min="0.6"
        max="1"
        step="0.2"
        className="range range-primary range-xs"
        {...props}
      />
    </div>
  )
}
