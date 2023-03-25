import SideDrawerButton from "@/components/layout/SideDrawerButton"
import { logout } from "@/libs/data/user/actions"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FiEdit2, FiLogOut } from "react-icons/fi"
import cookie from "cookie"
import { firebaseAdmin } from "@/config/firebaseAdmin"
import Avatar from "@/components/profile/Avatar"

export default function ProfilePage({ user }: { user: any }) {
  const [editMode, setEditMode] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    defaultValues: { name: user.name, email: user.email },
    // resolver: yupResolver(notebookValidation),
  })

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <main className="p-6">
      <header className="mb-6 flex justify-end lg:hidden">
        <SideDrawerButton />
      </header>

      <div className="prose">
        <h1>Profile</h1>
      </div>

      <div className="py-12 lg:max-w-lg">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex w-full flex-col items-center lg:w-1/2">
            <Avatar name={user.name} large />
            {/* <button className="btn-ghost btn-sm btn mt-1 block">
              Edit photo
            </button> */}
          </div>

          <form className="w-full space-y-4">
            <div className="form-control w-full">
              <label className="label px-0 opacity-60">
                <span className="label-text">Name</span>
              </label>
              <input
                readOnly={!editMode}
                type="text"
                // placeholder="johndoe@example.com"
                className="input-bordered input w-full read-only:border-0 read-only:p-0 read-only:focus:ring-0"
                {...register("name")}
              />
            </div>

            <div className="form-control w-full">
              <label className="label px-0 opacity-60">
                <span className="label-text">Email</span>
              </label>
              <input
                readOnly={!editMode}
                type="text"
                // placeholder="johndoe@example.com"
                className="input-bordered input w-full read-only:border-0 read-only:p-0"
                {...register("email")}
              />
            </div>
          </form>
        </div>
        <div className="mt-12 flex space-x-2">
          {!editMode ? (
            <>
              <button
                className="btn-primary btn w-full flex-1 gap-2 lg:w-fit lg:flex-initial"
                onClick={() => setEditMode(true)}
              >
                <FiEdit2 />
                edit
              </button>
              <button
                className="btn-outline btn-error btn gap-2"
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-ghost btn"
                onClick={() => setEditMode(false)}
              >
                cancel
              </button>
              <button
                className="btn-primary btn"
                disabled={
                  watch("name") === user?.displayName &&
                  watch("email") === user?.email
                }
                onClick={() => console.log("saved")}
              >
                save
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    if (!req.headers.cookie) throw Error

    const { auth_token } = cookie.parse(req.headers.cookie)

    if (!auth_token) throw Error

    const user = await firebaseAdmin.auth().verifyIdToken(auth_token)

    if (!user) throw Error

    return {
      props: { user },
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}
