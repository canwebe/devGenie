import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
	const date = new Date(input)
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	})
}

export function getPromt(
	mode: string,
	tone: string,
	characters: number,
	prompt: string
) {
	let promptType = 'a profile bio'

	if (mode === 'project') {
		promptType = 'a project description'
	}

	if (mode === 'experience') {
		promptType = 'an experience'
	}

	return `Create ${promptType} in ${tone} tone. Make sure to use simple sentences, under ${characters?.toString()} characters and base them on this context : ${prompt}`
}
