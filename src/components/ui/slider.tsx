'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'

import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
	const [sliderValue, setSliderValue] = React.useState(200)
	const [drag, setDrag] = React.useState(false)

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				'relative flex w-full touch-none select-none items-center',
				className
			)}
			{...props}
			onValueChange={(value) => setSliderValue(value[0])}
			onPointerDown={() => setDrag(true)}
			onPointerUp={() => setDrag(false)}
		>
			<SliderPrimitive.Track className='relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20'>
				<SliderPrimitive.Range className='absolute h-full bg-primary' />
			</SliderPrimitive.Track>
			<TooltipProvider delayDuration={0}>
				<Tooltip open={drag === true ? true : undefined}>
					<TooltipTrigger asChild>
						<SliderPrimitive.Thumb
							id='thumb'
							className={cn(
								'block cursor-grab h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
								drag ? 'cursor-grabbing' : 'cursor-grab'
							)}
						/>
					</TooltipTrigger>
					<TooltipContent className='relative'>
						{sliderValue}
						<TooltipArrow className='fill-foreground' />
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</SliderPrimitive.Root>
	)
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
