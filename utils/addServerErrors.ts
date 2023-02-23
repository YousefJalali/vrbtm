import { FieldError, FieldErrors, Path, UseFormSetError } from "react-hook-form"

export function addServerErrors<T>(
  errors: FieldErrors,
  //@ts-ignore
  setError: UseFormSetError<T>
) {
  for (const [key, value] of Object.entries(errors)) {
    setError(key as Path<T>, {
      type: "manual",
      message: (value as FieldError).message,
    })
  }
}

export default addServerErrors
