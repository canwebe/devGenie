'use client'

import { Button } from '@/components/ui/button'

export default function ErrorPage({
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<div className='h-screen bg-background flex justify-center items-center'>
			<div className='text-center'>
				<h2 className='font-bold select-none text-red-600 text-9xl'>:(</h2>
				<p className='text-xl font-semibold text-red-600 tracking-wider mt-8'>
					Something Went Wrong.
				</p>
				<Button
					className='text-red-600'
					variant={'link'}
					type='reset'
					onClick={() => reset()}
				>
					Try again
				</Button>
			</div>
		</div>
	)
}
