import { Notebook } from "@/libs/types"
import { GetStaticProps } from "next"
import { prisma } from "@/libs/db/prisma"
import { SWRConfig, unstable_serialize } from "swr"
import NotebookDetails from "@/components/notebook/notebook-details/NotebookDetails"

type FallbackProp = {
  [key: string]: {
    data: Notebook[]
  }
}

export default function NotebookDetailsPage({
  fallback,
  id,
}: {
  fallback: FallbackProp
  id: string
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <NotebookDetails id={id} />
    </SWRConfig>
  )
}

export async function getStaticPaths() {
  const notebooks = await prisma.notebook.findMany({})
  const paths = notebooks.map(({ id }) => ({ params: { id } }))
  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params || typeof context.params.id !== "string") {
    return { props: {} }
  }

  try {
    const notebook = await prisma.notebook.findFirst({
      where: {
        id: context.params.id,
      },
      include: {
        flashcards: true,
      },
    })

    if (!notebook) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        fallback: {
          [unstable_serialize(["/api/notebooks", `/${context.params.id}`])]: {
            data: JSON.parse(JSON.stringify(notebook)),
          },
        },
        id: context.params.id,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
