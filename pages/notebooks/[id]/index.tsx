import { Notebook } from "@/libs/types"
import { GetStaticProps } from "next"
import { prisma } from "@/libs/db/prisma"
import { SWRConfig, unstable_serialize } from "swr"
import { useRouter } from "next/router"
import NotebookDetails from "@/components/notebook/NotebookDetails"

export default function NotebookDetailsPage({
  fallback,
}: {
  [key: string]: Notebook[]
}) {
  const router = useRouter()

  if (typeof router.query.id !== "string") {
    return "Notebook not found"
  }

  return (
    <SWRConfig value={{ fallback }}>
      <NotebookDetails id={router.query.id} />
    </SWRConfig>
  )
}

export async function getStaticPaths() {
  const notebooks = await prisma.notebook.findMany({})
  const paths = notebooks.map(({ id }) => ({ params: { id } }))
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params || typeof context.params.id !== "string") {
    return {
      props: {},
    }
  }

  const notebook = await prisma.notebook.findFirst({
    where: {
      id: context.params.id,
    },
  })

  return {
    props: {
      // notebook: JSON.parse(JSON.stringify(notebook)),
      fallback: {
        [unstable_serialize(["/api/notebooks", `/${context.params.id}`])]:
          JSON.parse(JSON.stringify(notebook)),
      },
    },
  }
}
