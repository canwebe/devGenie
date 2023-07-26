import { formSchema } from './formSchema'
import { User } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'
import { Dispatch } from 'react'
import { z } from 'zod'

// Firebase types
export enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  AUTHREADY = 'AUTHREADY',
}

export type AuthData = {
  isAuthReady: Boolean
  user: User | null
}

export type UserData = {
  photoURL: string
  uid: string
}

export type Action =
  | { type: AuthActionType.LOGOUT }
  | {
      type: AuthActionType.LOGIN | AuthActionType.AUTHREADY
      payload: User | null
    }

export type AuthContextType = AuthData & { dispatch: Dispatch<Action> }

// Other types
export type formData = z.infer<typeof formSchema>

export type Data = Omit<z.infer<typeof formSchema>, 'description'> & {
  prompt: string
  uid: string
}

export type PlaceholderObj = {
  [key: string]: string
}

export type InsightProps = {
  count: number
  usersList: DocumentData[]
}
