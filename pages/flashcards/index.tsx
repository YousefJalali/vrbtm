import { Notebook } from "@/libs/types"
import { GetStaticProps } from "next"
import { prisma } from "@/libs/db/prisma"
import { SWRConfig, unstable_serialize } from "swr"
import Header from "@/components/layout/Header"
import FlashcardList from "@/components/flashcard/FlashcardList"

export default function Flashcards({
  fallback,
}: {
  [key: string]: Notebook[]
}) {
  return (
    <>
      <Header title="Flashcards" />

      <main className="px-6">
        <SWRConfig value={{ fallback }}>
          <FlashcardList />
        </SWRConfig>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const flashcards = await prisma.flashcard.findMany({})

  return {
    props: {
      fallback: {
        [unstable_serialize(["/api/flashcards", ""])]: JSON.parse(
          JSON.stringify(flashcards)
        ),
      },
    },
  }
}
