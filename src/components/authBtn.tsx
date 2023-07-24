'use client'

import { GithubIcon, GoogleIcon } from './icons'
import { Button } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './ui/dialog'

import { cn } from '@/lib/utils'

import { useAuth } from '@/contexts/firebaseContext'
import useLogin from '@/hooks/useLogin'
import useLogout from '@/hooks/useLogout'
import { Loader } from 'lucide-react'

export default function AuthBtn() {
	const { user, isAuthReady } = useAuth()

	const provider = user?.providerId

	console.log('Provider', provider)

	const { login, isLoading } = useLogin()
	const { logout, isLoading: logoutLoading } = useLogout()

	if (user && !isLoading) {
		return (
			<Button
				className='w-20'
				disabled={logoutLoading}
				onClick={logout}
				variant={'destructive'}
				size={'sm'}
			>
				Logout
			</Button>
		)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='w-20' disabled={!isAuthReady} size={'sm'}>
					Login
				</Button>
			</DialogTrigger>
			<DialogContent className='py-20'>
				<DialogHeader>
					<DialogTitle className='text-2xl sm:text-3xl text-center mb-8'>
						Log in to DevGenie
					</DialogTitle>
					<DialogDescription className='flex flex-col gap-3 justify-center'>
						<Button
							disabled={isLoading}
							onClick={() => login('github')}
							className='flex gap-2 items-center mx-auto'
							size={'lg'}
							variant={'outline'}
						>
							{isLoading ? (
								<>
									<Loader className='animate-spin' />
									Loading
								</>
							) : (
								<>
									<GithubIcon className='text-foreground' />
									Continue with GitHub
								</>
							)}
						</Button>
						<span
							className={cn(
								'flex items-center text-center px-8',
								'before:h-px before:mr-4 before:bg-border before:flex-1',
								'after:h-px after:ml-4 after:bg-border after:flex-1'
							)}
						>
							or
						</span>
						<Button
							disabled={isLoading}
							onClick={() => login('google')}
							className='flex gap-2 items-center mx-auto'
							size={'lg'}
							variant={'outline'}
						>
							{isLoading ? (
								<>
									<Loader className='animate-spin' />
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
