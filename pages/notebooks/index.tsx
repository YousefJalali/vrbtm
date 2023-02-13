import { Notebook } from "@prisma/client"
import { GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { FiPlus } from "react-icons/fi"
import { prisma } from "@/libs/db/prisma"
import { SWRConfig, unstable_serialize } from "swr"
import NotebookList from "@/components/notebook/NotebookList"

const NewNotebook = dynamic(() => import("@/components/notebook/NewNotebook"), {
  ssr: false,
})

export default function Notebooks({ fallback }: { [key: string]: Notebook[] }) {
  return (
    <main>
      <SWRConfig value={{ fallback }}>
        <NotebookList />
      </SWRConfig>

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
      fallback: {
        [unstable_serialize(["/api/notebook", "?q=list"])]: JSON.parse(
          JSON.stringify(notebooks)
        ),
      },
    },
  }
}
