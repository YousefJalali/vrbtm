import {
  Notebook as NotebookType,
  Flashcard as FlashcardType,
  Prisma,
  User as UserType,
} from "@prisma/client"

export type Notebook = NotebookType
export type NotebookWithFlashcards = Prisma.NotebookGetPayload<{
  include: {
    flashcards: true
    _count: {
      select: {
        flashcards: true
      }
    }
  }
}>
export type NotebookWithFlashcardsCount = Prisma.NotebookGetPayload<{
  include: {
    _count: {
      select: {
        flashcards: true
      }
    }
  }
}>

export type Flashcard = FlashcardType
export type FlashcardWithNotebook = Prisma.FlashcardGetPayload<{
  include: { notebook: { select: { id: true; title: true; color: true } } }
}>

export type User = UserType
export type CreateUserType = { name: string; email: string; password: string }
export type LoginUserType = { email: string; password: string }
export type ForgotPasswordType = { email: string }
export type ResetPasswordType = { password: string; confirmPassword: string }
export type UpdateProfileType = { displayName: string }
