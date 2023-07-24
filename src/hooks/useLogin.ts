import { useAuth } from '@/contexts/firebaseContext'
import { GithubProvider, GoogleProvider, auth } from '@/lib/firebase'
import { AuthActionType } from '@/reducers/authReducer'
import { createUser } from '@/utils/firebase-helper'
import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'

export default function useLogin() {
	const [isLoading, setIsLoading] = useState(false)

	// Dispatch
	const { dispatch } = useAuth()

	const login = async (provider: string) => {
		try {
			setIsLoading(true)
			const userCredendtial = await signInWithPopup(
				auth,
				provider === 'google' ? GoogleProvider : GithubProvider
			)
			if (!userCredendtial?.user)
				throw Error('No user object found in login credential')

			// Creating User object on DB
			await createUser(userCredendtial?.user)
			toast.success('Yo, You are now logged in')
			// Dispatching Login
			dispatch({ type: AuthActionType.LOGIN, payload: userCredendtial?.user })
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong in login, Try Again!')
			setIsLoading(false)
		}
	}

	return { login, isLoading }
}
