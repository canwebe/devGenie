import { useAuth } from '@/contexts/firebaseContext'
import { auth } from '@/lib/firebase'
import { AuthActionType } from '@/reducers/authReducer'
import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'sonner'

export default function useLogout() {
  // Local States
  const [isLoading, setIsLoading] = useState(false)

  // Dispatch
  const { dispatch } = useAuth()

  const logout = async () => {
    try {
      setIsLoading(true)
      await signOut(auth)
      dispatch({ type: AuthActionType.LOGOUT })
      setIsLoading(false)
      toast.success('Logged out')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in logout, Try Again!')
      setIsLoading(false)
    }
  }

  return { logout, isLoading }
}
