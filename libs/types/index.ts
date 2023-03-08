import {
  Notebook as NotebookType,
  Flashcard as FlashcardType,
  Prisma,
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
