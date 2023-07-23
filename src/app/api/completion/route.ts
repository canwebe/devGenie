// API/COMPLETION

import { getPromt } from '@/utils/helper'
import { CohereStream, StreamingTextResponse } from 'ai'

interface Data {
	prompt: string
	mode: string
	tone: string
	creativity: string
	characters: number
}

// For Running on Edge
export const runtime = 'edge'

export async function POST(req: Request) {
	// Getting the request data
	const data: Data = await req.json()

	console.log('\nPrompt:', data)

	// Destructuring the data object
	const { prompt, mode, tone, creativity, characters } = data

	// Getting the prompt based on type
	const promptText = getPromt(mode, tone, characters, prompt)

	// Body for POST request
	const body = JSON.stringify({
		model: 'command-xlarge-nightly',
		prompt: promptText,
		return_likelihoods: 'NONE',
		max_tokens: 250, // size of the response text
		temperature: parseInt(creativity), // randomness
		stream: true // For streaming response
	})

	console.log('\nBody:', data)

	// Fetching POST request to cohere api
	const response = await fetch('https://api.cohere.ai/generate', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.COHERE_API_KEY!}`,
			'Cohere-Version': '2022-12-06'
		},
		body
	})

	const stream = CohereStream(response)

	return new StreamingTextResponse(stream)
}
