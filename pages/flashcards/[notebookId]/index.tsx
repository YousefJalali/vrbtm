import Header from "@/components/layout/Header"
import { NotebookWithFlashcards } from "@/libs/types"
import { GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { FiChevronLeft } from "react-icons/fi"
import { SWRConfig, unstable_serialize } from "swr"
import { prisma } from "@/libs/db/prisma"
import NotebookFlashcardsList from "@/components/flashcard/NotebookFlashcardsList"

export default function NotebookFlashcards({
  fallback,
}: {
  [key: string]: NotebookWithFlashcards[]
}) {
  const router = useRouter()

  if (typeof router.query.notebookId !== "string") {
    return "Notebook not found!!!"
  }

  return (
    <>
      <Header
        leftIcon={
          <a
            onClick={router.back}
            className="btn-ghost btn-sm btn-square btn -ml-3"
          >
            <FiChevronLeft size={24} />
          </a>
        }
        title=""
        rightIcon={<button className="btn-ghost btn-sm btn">select</button>}
      />

      <SWRConfig value={{ fallback }}>
        <NotebookFlashcardsList id={router.query.notebookId} />
      </SWRConfig>
    </>
  )
}

export async function getStaticPaths() {
  const notebooks = await prisma.notebook.findMany({})
  const paths = notebooks.map(({ id }) => ({ params: { notebookId: id } }))
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
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
      // notebook: JSON.parse(JSON.stringify(notebook)),
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
