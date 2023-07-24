import { cn } from '@/lib/utils'
import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface InsightProps extends HTMLAttributes<HTMLDivElement> {
	count: number
	usersList: DocumentData[]
}

export default async function Insights({
	count,
	usersList,
	className,
	...props
}: InsightProps) {
	console.count('Insight re-render')

	return (
		<div className={cn('text-center text-primary/50', className)} {...props}>
			<p className='text-md'>{count.toString()} generation so far.</p>
			<div>
				<p className='text-sm'>Recently Joined</p>
				<div className='flex justify-center items-center mt-2'>
					{usersList.map((user) => (
						<Image
							key={user?.uid}
							src={user?.photoURL}
							width={36}
							height={36}
							alt={user?.name}
							className='rounded-full dark:border-background border-2 [&:not(:first-child)]:-translate-x-2 '
						/>
					))}
				</div>
			</div>
		</div>
	)
}
