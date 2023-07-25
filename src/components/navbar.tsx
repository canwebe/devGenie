'use client'
import { ThemeToggle } from './themeToggle'

import { fontSansCD } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import AuthButton from './authButton'
import { Separator } from '@/components/ui/seprator'

export default function Navbar() {
	return (
		<div className='sticky backdrop-blur z-40 top-0 bg-background/80'>
			<nav className='max-w-2xl mx-auto w-full px-4 flex h-18 justify-between items-center'>
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
		</div>
	)
}
