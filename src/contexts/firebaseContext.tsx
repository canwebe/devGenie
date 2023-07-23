'use client'
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { Unsubscribe, onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/lib/firebase'
import AuthReducer, {
  Action,
  AuthActionType,
  AuthData,
  INITIAL_STATE,
} from '@/reducers/authReducer'

type AuthContextType = AuthData & { dispatch: Dispatch<Action> }

const AuthContext = createContext<AuthContextType>({
  ...INITIAL_STATE,
  dispatch: () => null,
})

export const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  // Check Auth (Persistence)
  useEffect(() => {
    let unsub: Unsubscribe | undefined
    try {
      unsub = onAuthStateChanged(auth, (user) => {
        dispatch({ type: AuthActionType.AUTHREADY, payload: user })
      })
    } catch (error) {
      console.log(error)
    }

    return () => unsub && unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
