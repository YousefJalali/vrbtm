import { NotebookWithFlashcards } from "@/libs/types"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { SWRConfig, unstable_serialize } from "swr"
import { prisma } from "@/libs/db/prisma"
import NotebookFlashcardsList from "@/components/flashcard/notebook-flashcards-list/NotebookFlashcardsList"

export default function NotebookFlashcards({
  fallback,
}: {
  [key: string]: NotebookWithFlashcards[]
}) {
  const router = useRouter()

  if (typeof router.query.notebookId !== "string") {
    return (
      <main className="p-6">
        <div>Flashcards not found</div>
      </main>
    )
  }

  return (
    <SWRConfig value={{ fallback }}>
      <NotebookFlashcardsList notebookId={router.query.notebookId} />
    </SWRConfig>
  )
}

export async function getStaticPaths() {
  const notebooks = await prisma.notebook.findMany({})
  const paths = notebooks.map(({ id }) => ({ params: { notebookId: id } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params || typeof context.params.notebookId !== "string") {
    return {
      props: {},
    }
  }

  const notebook = await prisma.notebook.findFirst({
    where: {
      id: context.params.notebookId,
    },
  })

  return {
    props: {
      fallback: {
        [unstable_serialize([
          "/api/notebooks",
          `/${context.params.notebookId}`,
        ])]: {
          data: JSON.parse(JSON.stringify(notebook)),
        },
      },
    },
  }
}
