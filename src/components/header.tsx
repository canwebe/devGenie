import Insights from './insights'
import { Badge } from '@/components/ui/badge'
import { fontSansCD } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { DocumentData } from 'firebase/firestore'
import { GithubIcon } from 'lucide-react'

export default function Header({
	count,
	usersList
}: {
	count: number
	usersList: DocumentData[]
}) {
	return (
		<header className='flex max-w-2xl px-1 mx-auto py-14 flex-col justify-center items-center text-center'>
			<a
				href='https://github.com/canwebe/devGenie'
				target='_blank'
				rel='noopener noreferrer'
			>
				<Badge
					variant={'outline'}
					className='shadow-md rounded-full font-medium text-sm py-2 px-4 hover:cursor-pointer hover:bg-muted'
				>
					<GithubIcon size={14} className='mr-2' />
					<p>Star on GitHub</p>
				</Badge>
			</a>
			<h1
				className={cn(
					'text-3xl min-[520px]:text-4xl sm:text-5xl tracking-wide font-sans-cd font-extrabold mt-6',
					fontSansCD.variable
				)}
			>
				Craft a Standout Profile with AI Assistance
			</h1>
			{/* <p className='text-primary/50 text-xs sm:text-sm px-[3.5px] md:text-md mt-3'>
				Stand out from the crowd effortlessly. Our AI-driven platform helps you
				create compelling profiles, project descriptions, and experiences that
				showcase your skills and expertise.
			</p> */}
			<Insights className='mt-2' count={count} usersList={usersList} />
		</header>
	)
}
