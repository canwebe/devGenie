'use client'

import { ThemeToggle } from './themeToggle'

import AuthButton from '@/components/authButton'
import { Separator } from '@/components/ui/seprator'

import { fontSansCD } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export default function Nav() {
	return (
		<>
			<nav className='max-w-2xl mx-auto w-full px-4 flex h-16 justify-between items-center'>
				<h1
					className={cn(
						'text-xl font-semibold font-sans-cd',
						fontSansCD.variable
					)}
				>
					DevGenie
				</h1>
				<div className='flex gap-4 items-center'>
					<ThemeToggle />
					<AuthButton />
				</div>
			</nav>
			<Separator />
		</>
	)
}
