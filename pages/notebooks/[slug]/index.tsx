import { Notebook } from "@prisma/client"
import { GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { FiArrowLeft, FiPlus } from "react-icons/fi"
import { prisma } from "@/libs/db/prisma"
import Link from "next/link"

export default function NotebookDetails({ notebook }: { notebook: Notebook }) {
  if (!notebook) {
    return (
      <main>
        <h1>No Notebook Found</h1>
      </main>
    )
  }
  return (
    <main className="prose">
      <Link href="/notebooks">
        <FiArrowLeft size={24} />
      </Link>
      <h1>{notebook.title}</h1>
    </main>
  )
}

export async function getStaticPaths() {
  const notebooks = await prisma.notebook.findMany({})
  const paths = notebooks.map(({ title }) => ({ params: { slug: title } }))
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params || typeof context.params.slug !== "string") {
    return {
      props: {},
    }
  }

  console.log(context)
  const notebook = await prisma.notebook.findFirst({
    where: {
      title: context.params.slug,
    },
  })

  return {
    props: {
      notebook: JSON.parse(JSON.stringify(notebook)),
    },
  }
}
