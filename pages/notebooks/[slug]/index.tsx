import { Notebook } from "@/libs/types"
import { GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { FiArrowLeft, FiPlus } from "react-icons/fi"
import { prisma } from "@/libs/db/prisma"
import Link from "next/link"
import Editor from "@/components/editor/Editor"

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
      <h3>{notebook.title}</h3>
      <p>{notebook.description}</p>
      {notebook.content.length > 0 && (
        <div>
          <Editor readOnly defaultValue={notebook.content} notebook omitMode />
        </div>
      )}
    </main>
  )
}

export async function getStaticPaths() {
  const notebooks = await prisma.notebook.findMany({})
  const paths = notebooks
    .slice(0, 10)
    .map(({ title }) => ({ params: { slug: title } }))
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
