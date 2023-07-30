'use client'

import { useEffect } from 'react'

import { ThemeToggle } from './themeToggle'
import AuthButton from '@/components/authButton'
import { Separator } from '@/components/ui/seprator'

import { fontSansCD } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export default function Nav() {
	useEffect(() => {
		console.log(
			'%cCan%cWeBe!',
			'color: #e47e24; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;',
			'color: #fff; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;'
		)
		console.log(
			'%cHey explorer!, Are you lost?? Because this is not the right place for you. If you want to work with us at CanWeBe contact us now.',
			'color: #e1e1e1; font-size: 1.5em;'
		)
	}, [])

	return (
		<div className='sticky top-0 backdrop-blur z-50 bg-background/90'>
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
		</div>
	)
}
