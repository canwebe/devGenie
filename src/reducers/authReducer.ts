import { Action, AuthActionType, AuthData } from '@/lib/types'

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
