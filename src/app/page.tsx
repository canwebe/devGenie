import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NumberList } from '@/components/ui/number'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/seprator'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { fontSansCD } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { ArrowRight, GithubIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col'>
			{/* Navbar */}
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
					<Link href={'/login'} className={buttonVariants({ size: 'sm' })}>
						Login
					</Link>
				</div>
			</nav>
			<Separator />

			{/* Header component */}
			<header className='flex max-w-2xl px-1 mx-auto pt-10 pb-12 sm:py-12 md:py-16 flex-col justify-center items-center text-center'>
				<Link href={'https://github.com/canwebe/devGenie'} target='_blank'>
					<Badge
						variant={'outline'}
						className='shadow-md rounded-full font-medium text-sm py-2 px-4 hover:cursor-pointer hover:bg-muted'
					>
						<GithubIcon size={14} className='mr-2' />
						<p>Star on GitHub</p>
					</Badge>
				</Link>
				<h1
					className={cn(
						'text-3xl min-[520px]:text-4xl sm:text-5xl tracking-wide font-sans-cd font-extrabold mt-6',
						fontSansCD.variable
					)}
				>
					Craft a Standout Profile with AI Assistance
				</h1>
				<p className='text-primary/50 text-xs sm:text-sm px-[3.5px] md:text-md mt-3'>
					Stand out from the crowd effortlessly. Our AI-driven platform helps
					you create compelling profiles, project descriptions, and experiences
					that showcase your skills and expertise.
				</p>
			</header>

			<main className='max-w-2xl w-full px-4 mx-auto'>
				{/* Select mode component */}
				<Label htmlFor='select-mode' className='flex gap-3 items-center'>
					<NumberList>1</NumberList>
					Select a mode
				</Label>
				<Select defaultValue='p'>
					<SelectTrigger id='select-mode' className='mt-2 mb-6'>
						<SelectValue placeholder='Profile Bio' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='p'>Profile Bio</SelectItem>
							<SelectItem value='pd'>Project Description</SelectItem>
							<SelectItem value='ed'>Experience Description</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				{/* Description component */}
				<Label htmlFor='description' className='flex gap-3 items-center'>
					<NumberList>2</NumberList>
					Description
				</Label>
				<Textarea
					id='description'
					className='mt-2 mb-6 h-24'
					placeholder='Enter your description...'
				/>

				{/* Select component for Tone & creativity */}
				<Label className='flex gap-3 items-center'>
					<NumberList>3</NumberList>
					Fine tunning
				</Label>
				<div className='flex mt-2 mb-6 tems-center gap-4'>
					{/* Select tone component */}
					<Select>
						<SelectTrigger>
							<SelectValue placeholder='Tone' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel className='px-[25px] text-sm leading-[25px] font-light'>
									Tone
								</SelectLabel>
								<SelectSeparator />
								<SelectItem value='professional'>Professional</SelectItem>
								<SelectItem value='casual'>Casual</SelectItem>
								<SelectItem value='funny'>Funny</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					{/* Select creativity component */}
					<Select>
						<SelectTrigger>
							<SelectValue placeholder='Creativity' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel className='text-sm leading-[25px] font-light'>
									Creativity
								</SelectLabel>
								<SelectSeparator />
								<SelectItem value='0'>0%</SelectItem>
								<SelectItem value='0.5'>50%</SelectItem>
								<SelectItem value='1'>100%</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				{/* Slider component */}
				<Label>
					Chracters
					<Slider
						className='mt-2 mb-16'
						defaultValue={[120]}
						min={60}
						max={60 * 4}
					/>
				</Label>

				{/* Submit button */}
				<Button type='submit' size={'lg'} className='w-full'>
					Generate
					<ArrowRight size={14} className='ml-1' />
				</Button>

				{/* Generate div */}
				<output className='flex flex-col space-y-10 my-10'>
					<h2
						className={cn(
							'sm:text-4xl min-[520px]:text-3xl text-2xl font-semibold tracking-wide text-foreground mx-auto font-sans-cd',
							fontSansCD.variable
						)}
					>
						Your generated bio
					</h2>
					<div
						title='Click to copy'
						className='rounded-xl shadow-md p-4 hover:bg-muted/50 transition cursor-copy border'
						// onClick={() => {
						// 	navigator.clipboard.writeText("i");
						// }}
					>
						<p>
							Aenean mi magna, interdum eget rutrum at, laoreet sit amet mauris.
							Donec auctor rutrum ipsum, nec luctus turpis tempor sit amet.
						</p>
					</div>
				</output>
			</main>
			<Separator className='sm:mt-22 mt-6' />
			<footer className='text-center max-w-2xl mx-auto h-16 sm:h-20 w-full sm:pt-2 pt-4 flex sm:flex-row flex-col justify-center items-center px-3 space-y-3 sm:mb-0 mb-3'>
				<p className='font-light'>
					Powered by{' '}
					<Link className='font-bold' href={'https://cohere.com/'}>
						Cohere
					</Link>{' '}
					and{' '}
					<Link className='font-bold' href={'https://sdk.vercel.ai/docs'}>
						Vercel AI SDK
					</Link>
				</p>
			</footer>
		</div>
	)
}
