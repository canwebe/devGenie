import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'

import { useAuth } from '@/contexts/firebaseContext'
import { GithubProvider, GoogleProvider, auth } from '@/lib/firebase'
import { createUser } from '@/lib/firebaseHelper'
import { AuthActionType } from '@/lib/types'

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
			toast.success('You are now logged in.')
			// Dispatching Login
			dispatch({ type: AuthActionType.LOGIN, payload: userCredendtial?.user })
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong while login. Try again!')
			setIsLoading(false)
		}
	}

	return { login, isLoading }
}
