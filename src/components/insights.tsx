import { getGenerationCount, getUsersLists } from '@/lib/firebaseHelper'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLAttributes } from 'react'

type InsightProps = HTMLAttributes<HTMLDivElement>

export default async function Insights({ className, ...props }: InsightProps) {
	console.count('Insight re-render')

	const countData = getGenerationCount()
	const usersListData = getUsersLists()

	const [count, usersList] = await Promise.all([countData, usersListData])

	return (
		<div
			className={cn('text-center w-full flex flex-col gap-2', className)}
			{...props}
		>
			<p className='text-sm font-light'>
				Generated {count.toString()} times so far.
			</p>
			<p className='text-xs mt-3 font-bold text-primary/50 uppercase'>
				Recently Joined
			</p>
			<div className='flex justify-center items-center'>
				{usersList.map((user) => (
					<Image
						key={user?.uid}
						src={user?.photoURL}
						width={36}
						height={36}
						alt={user?.name || 'profile picture'}
						className='rounded-full dark:border-background border-2 [&:not(:first-child)]:-translate-x-2 '
					/>
				))}
			</div>
		</div>
	)
}
