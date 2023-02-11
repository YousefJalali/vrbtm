import { UseFormProps, UseFormReturn, useForm } from "react-hook-form"
import { AnyObjectSchema, Asserts } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export function useFormWithSchema<T extends AnyObjectSchema>(
  schema: T,
  useFormProps?: UseFormProps<Asserts<T>>
): UseFormReturn<Asserts<T>> {
  return useForm({ ...useFormProps, resolver: yupResolver(schema) })
}
