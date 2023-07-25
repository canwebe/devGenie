import { useAuth } from '@/contexts/firebaseContext'
import { auth } from '@/lib/firebase'
import { AuthActionType } from '@/lib/types'
import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'

export default function useLogout() {
	const [isLoading, setIsLoading] = useState(false)

	const { dispatch } = useAuth()

	const logout = async () => {
		try {
			setIsLoading(true)
			await signOut(auth)
			dispatch({ type: AuthActionType.LOGOUT })
			setIsLoading(false)
			toast.success('Logged out!')
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong while logout. Try again!')
			setIsLoading(false)
		}
	}

	return { logout, isLoading }
}
