import { formSchema } from './formSchema'
import { User } from 'firebase/auth'
import { z } from 'zod'

// Firebase types
export enum AuthActionType {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	AUTHREADY = 'AUTHREADY'
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

// Form types
export type formData = z.infer<typeof formSchema>

export type Mode = 'profile' | 'project' | 'experience'

export type Tone = 'professional' | 'casual' | 'funny'

export type CreativityKeys = 'none' | 'low' | 'medium' | 'high' | 'max'
export type Creativity = {
	[key in CreativityKeys]: number
}

export type Data = Omit<z.infer<typeof formSchema>, 'description'> & {
	prompt: string
}
