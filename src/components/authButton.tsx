'use client'

import { GithubIcon, GoogleIcon, SpinnerBars } from './icons'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

import { cn } from '@/lib/utils'

import { useAuth } from '@/contexts/firebaseContext'
import useLogin from '@/hooks/useLogin'
import useLogout from '@/hooks/useLogout'

export default function AuthButton() {
	const { user, isAuthReady } = useAuth()
	const provider = user?.providerData[0].providerId

	const { login, isLoading } = useLogin()
	const { logout, isLoading: logoutLoading } = useLogout()

	if (user && !isLoading) {
		return (
			<Button
				className='w-18 dark:bg-red-600 dark:hover:bg-red-700 bg-red-500'
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
				<Button className='w-18' disabled={!isAuthReady} size={'sm'}>
					Login
				</Button>
			</DialogTrigger>
			<DialogContent className='py-16'>
				<DialogHeader>
					<DialogTitle className='text-2xl sm:text-3xl text-center mb-8'>
						Log in to DevGenie
					</DialogTitle>
					<DialogDescription className='flex flex-col gap-5'>
						<Button
							disabled={isLoading}
							onClick={() => login('github')}
							className='flex gap-2 items-center mx-auto min-w-[15rem]'
							size={'lg'}
							variant={'outline'}
						>
							{isLoading && provider === 'github.com' ? (
								<>
									<SpinnerBars width={16} height={16} />
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
								'flex items-center text-center min-[420px]:px-8 w-full',
								'before:h-px before:mr-4 before:bg-border/50 before:flex-1',
								'after:h-px after:ml-4 after:bg-border/50 after:flex-1'
							)}
						>
							or
						</span>
						<Button
							disabled={isLoading}
							onClick={() => login('google')}
							className='flex gap-2 items-center mx-auto min-w-[15rem]'
							size={'lg'}
							variant={'outline'}
						>
							{isLoading && provider === 'google.com' ? (
								<>
									<SpinnerBars width={16} height={16} />
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
