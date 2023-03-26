import {
  CreateUserType,
  ForgotPasswordType,
  LoginUserType,
  ResetPasswordType,
  UpdateProfileType,
} from "@/libs/types"
import { object, ref, Schema, string } from "yup"

export const loginValidation: Schema<LoginUserType> = object({
  email: string().email().defined().required("Enter your email"),
  password: string().defined().required("Enter your password"),
})

export const signUpValidation: Schema<CreateUserType> = object({
  name: string().defined().required("Enter your full name"),
  email: string().email().defined().required("Enter your email"),
  password: string().defined().required("Enter your password"),
})

export const forgotPasswordValidation: Schema<ForgotPasswordType> = object({
  email: string().email().defined().required("Enter your email"),
})

export const resetPasswordValidation: Schema<ResetPasswordType> = object({
  password: string().defined().required("Enter new password"),
  confirmPassword: string()
    .defined()
    .oneOf([ref("password"), ""], "Passwords must match"),
})

export const updateProfileValidation: Schema<UpdateProfileType> = object({
  displayName: string().defined().required("Enter your full name"),
})
