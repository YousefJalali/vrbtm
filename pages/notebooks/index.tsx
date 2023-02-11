import { Notebook } from "@prisma/client"
import { GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { FiPlus } from "react-icons/fi"
import { prisma } from "@/libs/db/prisma"
import Link from "next/link"

const NewNotebook = dynamic(() => import("@/components/notebook/NewNotebook"), {
  ssr: false,
})

export default function Notebooks({ notebooks }: { notebooks: Notebook[] }) {
  return (
    <main>
      <input
        type="text"
        placeholder="Search..."
        className="input-bordered input w-full "
      />

      <ul className="menu divide-y bg-base-100 py-2">
        {notebooks.length === 0 ? (
          <li>No notebooks</li>
        ) : (
          notebooks.map((notebook) => (
            <li key={notebook.id}>
              <Link href={`/notebooks/${notebook.title}`}>
                {notebook.title}
              </Link>
            </li>
          ))
        )}
      </ul>

      <label
        htmlFor="new-notebook-modal"
        className="btn-primary btn-circle btn fixed bottom-6 right-6 shadow-xl"
      >
        <FiPlus size={24} />
      </label>
      <NewNotebook />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const notebooks = await prisma.notebook.findMany({})

  return {
    props: {
      notebooks: JSON.parse(JSON.stringify(notebooks)),
    },
  }
}
