import { useNotebook } from "@/libs/data/notebook"
import { NotebookWithFlashcards } from "@/libs/types"
import FlashcardItem from "./FlashcardItem"

export default function NotebookFlashcardsList({ id }: { id: string }) {
  const { notebook } = useNotebook<NotebookWithFlashcards>(
    id,
    "with-flashcards"
  )

  if (!notebook) {
    return (
      <main>
        <div>Flashcards not found</div>
      </main>
    )
  }

  return (
    <>
      <div className="prose px-6 pb-6">
        <h2>{notebook.title}</h2>
      </div>
      <div className="carousel-vertical carousel space-y-6">
        {notebook.flashcards.map((flashcard) => (
          <div key={flashcard.id} className="carousel-item">
            <FlashcardItem
              flashcard={flashcard}
              notebookColor={notebook.color}
            />
          </div>
        ))}
      </div>
    </>
  )
}
