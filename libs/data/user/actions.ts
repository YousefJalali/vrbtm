import { customFetch } from "@/utils/customFetch"
import { CreateUserType, LoginUserType } from "@/libs/types"
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { auth } from "@/config/firebase"

export const createUser = async ({ name, email, password }: CreateUserType) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, {
      displayName: name,
    })
    const { uid } = user

    //create user in mongodb using uid
    try {
      return await customFetch("/api/auth", {
        method: "POST",
        bodyData: { uid },
      })
    } catch (error) {
      //error while creating user in mongodb, user should be deleted from firebase
      try {
        await deleteUser(user)
        return { error: "Error while creating user in DB" }
      } catch (error) {
        console.error("Error deleting Firebase user:", error)
        return { error }
      }
    }
  } catch (error: any) {
    //error in firebase
    switch (error?.code) {
      case "auth/email-already-in-use":
      case "auth/invalid-email":
      case "auth/weak-password":
        return { validationErrors: error?.code }
      default:
        return { error }
    }
  }
}

export const getUser = async ({ email, password }: LoginUserType) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    const { uid } = user

    const existingUser = await customFetch("/api/auth", {
      method: "PUT",
      bodyData: { uid },
    })

    if (!existingUser) {
      //error while fetching user from mongodb, user should be deleted from firebase
      try {
        await deleteUser(user)
        return { error: "User not found" }
      } catch (error) {
        console.error("Error deleting Firebase user:", error)
        return { error }
      }
    }

    return { data: existingUser }
  } catch (error: any) {
    switch (error?.code) {
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return { validationErrors: error?.code }
      default:
        break
    }

    return { error }
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.log(error)
    return { error }
  }
}
