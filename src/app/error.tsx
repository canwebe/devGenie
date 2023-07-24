'use client'

import { Button } from '@/components/ui/button'

export default function ErrorPage({
	reset
}: {
	error: Error
	reset: () => void
}) {
	return (
		<div className='h-screen grid place-items-center'>
			<div className='text-center'>
				<h3 className='font-bold text-[24px] opacity-60 mb-2'>
					Something Went Wrong!
				</h3>
				<Button
					variant={'ghost'}
					size={'sm'}
					type='reset'
					onClick={() => reset()}
				>
					Try again
				</Button>
			</div>
		</div>
	)
}
