'use client'

import { SpinnerDots } from './icons'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
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
import { useAuth } from '@/contexts/firebaseContext'
import { incrementGenerateCount } from '@/lib/firebaseHelper'
import { fontSansCD } from '@/lib/fonts'
import { formSchema } from '@/lib/formSchema'
import { formData } from '@/lib/types'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCompletion } from 'ai/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function MainForm() {
	const { user, isAuthReady } = useAuth()

	// Generated content ref for scrolling
	const targetRef = useRef<null | HTMLElement>(null)
	const scrollTo = () => {
		if (targetRef.current) {
			targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
		}
	}

	const form = useForm<formData>({
		defaultValues: {
			mode: 'bio',
			description: '',
			characters: 200
		},
		resolver: zodResolver(formSchema)
	})

	const { errors, isSubmitting } = form.formState

	// VercelAI SDK useCompletion api
	const { completion, complete, isLoading } = useCompletion({
		body: {
			tone: form.getValues('tone') || 'professional',
			mode: form.getValues('mode'),
			characters: form.getValues('characters'),
			creativity: form.getValues('creativity') || '0.9'
		},
		onResponse: (res) => {
			if (res.status === 429) {
				toast.error('You are being rate limited. Please try again later.')
			}
		},
		onFinish: () => {
			scrollTo()
			incrementGenerateCount()
		}
	})

	const onSubmit = async (data: formData) => {
		try {
			console.log('Form Data', data)
			if (!user) {
				return toast.error('Please login to generate.')
			}
			await complete(data?.description)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<main className='max-w-2xl w-full px-4 mx-auto'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} noValidate>
						{/* Mode select */}
						<FormField
							control={form.control}
							name='mode'
							render={({ field }) => (
								<FormItem className='mb-6'>
									<FormLabel className='flex gap-3 items-center mb-3'>
										<NumberList
											className={cn(errors?.mode && 'bg-destructive')}
										>
											1
										</NumberList>
										Select a mode
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger
												className={cn(errors?.mode && 'border-destructive')}
											>
												<SelectValue placeholder='Profile Bio' />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectGroup>
												<SelectItem value='bio'>Profile Bio</SelectItem>
												<SelectItem value='project'>
													Project Description
												</SelectItem>
												<SelectItem value='experience'>
													Experience Description
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Description textarea */}
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem className='mb-6'>
									<FormLabel className='flex gap-3 items-center mb-3'>
										<NumberList
											className={cn(errors?.description && 'bg-destructive')}
										>
											2
										</NumberList>
										Description
									</FormLabel>
									<FormControl>
										<Textarea
											className={cn(
												'h-24',
												errors?.description && 'border-destructive'
											)}
											placeholder='Enter your description...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Tone & creativity */}
						<Label className='flex gap-3 items-center mb-3'>
							<NumberList>3</NumberList>
							Fine tunning
						</Label>
						<div className='flex mt-2 mb-6 tems-center gap-4'>
							{/* Tone select */}
							<FormField
								control={form.control}
								name='tone'
								render={({ field }) => (
									<FormItem className='w-full'>
										<Select onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Tone' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectLabel className='px-[25px] text-sm leading-[25px] font-light'>
														Tone
													</SelectLabel>
													<SelectSeparator />
													<SelectItem value='professional'>
														Professional
													</SelectItem>
													<SelectItem value='casual'>Casual</SelectItem>
													<SelectItem value='funny'>Funny</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							{/* Creativity select */}
							<FormField
								control={form.control}
								name='creativity'
								render={({ field }) => (
									<FormItem className='w-full'>
										<Select onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Creativity' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectLabel className='text-sm leading-[25px] font-light'>
														Creativity
													</SelectLabel>
													<SelectSeparator />
													<SelectItem value='0'>No (Factual)</SelectItem>
													<SelectItem value='0.5'>Low</SelectItem>
													<SelectItem value='0.9'>Medium</SelectItem>
													<SelectItem value='1.5'>High</SelectItem>
													<SelectItem value='2'>Highest (Random)</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>

						{/* Character range input */}
						<FormField
							control={form.control}
							name='characters'
							render={({ field }) => (
								<FormItem className='mt-2 mb-12'>
									<FormLabel className='mb-5 block'>Characters</FormLabel>
									<FormControl>
										<Slider
											defaultValue={[field.value]}
											min={160}
											max={300}
											onValueCommit={(value) => field.onChange(value[0])}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						{/* Submit button */}
						<Button
							disabled={isLoading || isSubmitting || !isAuthReady}
							type='submit'
							size={'lg'}
							className='w-full'
						>
							{isLoading || isSubmitting ? (
								<SpinnerDots width={24} height={24} />
							) : (
								<>
									Generate
									<ArrowRight size={14} className='ml-1' />
								</>
							)}
						</Button>
					</form>
				</Form>

				{/* Generated output */}
				<output className='flex flex-col space-y-10 mt-12'>
					{completion ? (
						<>
							<h2
								className={cn(
									'sm:text-4xl min-[520px]:text-3xl text-2xl font-semibold tracking-wide text-foreground mx-auto font-sans-cd',
									fontSansCD.variable
								)}
							>
								Your generated bio
							</h2>
							<div
								tabIndex={0}
								title='Click to copy the content.'
								className={cn(
									'rounded-xl shadow-md p-4 hover:bg-muted/50 transition cursor-copy border',
									'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
								)}
								onClick={() => {
									navigator.clipboard.writeText(completion)
									toast.success('Copied to clipboard successfullly.')
								}}
								onKeyDown={(value) => {
									if (value.key === 'Enter') {
										navigator.clipboard.writeText(completion)
										toast.success('Copied to clipboard successfullly.')
									}
									return
								}}
							>
								<p className='break-words'>{completion}</p>
							</div>
						</>
					) : null}
				</output>
			</main>
			<Separator className='sm:mt-16 mt-14' />
			<footer
				ref={targetRef}
				className='text-center text-sm max-w-2xl mx-auto h-16 sm:h-20 w-full sm:pt-2 pt-4 flex sm:flex-row flex-col justify-center items-center px-3 space-y-3 sm:mb-0 mb-3'
			>
				<p>
					Developed by{' '}
					<Link
						className='font-bold underline'
						href='https://canwebe.in/'
						target='_blank'
						rel='noopener noreferrer'
					>
						CanWeBe!
					</Link>{' '}
					with{' '}
					<Link
						className='font-bold underline'
						href='https://cohere.com/'
						target='_blank'
						rel='noopener noreferrer'
					>
						Cohere
					</Link>
				</p>
			</footer>
		</>
	)
}
