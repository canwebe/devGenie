'use client'

import { auth } from '@/lib/firebase'
import AuthReducer, {
	Action,
	AuthActionType,
	AuthData,
	INITIAL_STATE
} from '@/reducers/authReducer'
import { Unsubscribe, onAuthStateChanged } from 'firebase/auth'
import {
	Dispatch,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer
} from 'react'

type AuthContextType = AuthData & { dispatch: Dispatch<Action> }

const AuthContext = createContext<AuthContextType>({
	...INITIAL_STATE,
	dispatch: () => null
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

		return () => unsub?.()
	}, [])

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
