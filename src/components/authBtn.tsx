'use client'

import { GithubIcon, GoogleIcon } from './icons'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

import { ThemeToggle } from './theme-toggle'

import { cn } from '@/lib/utils'
import { fontSansCD } from '@/lib/fonts'

import useLogin from '@/hooks/useLogin'
import { Loader } from 'lucide-react'
import { useAuth } from '@/contexts/firebaseContext'
import useLogout from '@/hooks/useLogout'

export default function AuthBtn() {
  // Getting Auth Data
  const { user, isAuthReady } = useAuth()

  // Login
  const { login, isLoading } = useLogin()
  // Logout
  const { logout, isLoading: logoutLoading } = useLogout()

  if (!isAuthReady) {
    return (
      <Button variant="secondary" size={'sm'}>
        Wait
      </Button>
    )
  }

  if (user && !isLoading) {
    return (
      <Button
        disabled={logoutLoading}
        onClick={logout}
        variant="destructive"
        size={'sm'}
      >
        Logout
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'}>Login</Button>
      </DialogTrigger>
      <DialogContent className="py-20">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl text-center mb-8">
            Log in to DevGenie
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-3 justify-center">
            <Button
              disabled={isLoading}
              onClick={() => login('github')}
              className="flex gap-2 items-center mx-auto w-full"
              size={'lg'}
              variant={'outline'}
            >
              {isLoading ? (
                <>
                  <Loader />
                  Loading
                </>
              ) : (
                <>
                  <GithubIcon className="text-foreground" />
                  Continue with GitHub
                </>
              )}
            </Button>
            <p
              className={cn(
                'flex items-center text-center px-8',
                'before:h-px before:mr-4 before:bg-border before:flex-1',
                'after:h-px after:ml-4 after:bg-border after:flex-1'
              )}
            >
              or
            </p>
            <Button
              disabled={isLoading}
              onClick={() => login('google')}
              className="flex gap-2 items-center mx-auto w-full"
              size={'lg'}
              variant={'outline'}
            >
              {isLoading ? (
                <>
                  <Loader />
                  Loading
                </>
              ) : (
                <>
                  <GoogleIcon />
                  Continue with Google
                </>
              )}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
