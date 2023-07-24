import { User } from 'firebase/auth'

export enum AuthActionType {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	AUTHREADY = 'AUTHREADY'
}

export type AuthData = {
	isAuthReady: Boolean
	user: User | null
}

export type Action =
	| {
			type: AuthActionType.LOGOUT
	  }
	| {
			type: AuthActionType.LOGIN | AuthActionType.AUTHREADY
			payload: User | null
	  }

export const INITIAL_STATE: AuthData = {
	isAuthReady: false,
	user: null
}

export default function AuthReducer(state: AuthData, action: Action): AuthData {
	switch (action.type) {
		case AuthActionType.LOGIN:
			return { ...state, user: action.payload }
		case AuthActionType.LOGOUT:
			return { ...state, user: null }
		case AuthActionType.AUTHREADY:
			return {
				user: action.payload,
				isAuthReady: true
			}
		default:
			return state
	}
}
