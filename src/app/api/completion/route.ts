import { formSchema } from '@/lib/formSchema'
import { getPromt } from '@/utils/helper'
import { CohereStream, StreamingTextResponse } from 'ai'
import { z } from 'zod'

type Data = Omit<z.infer<typeof formSchema>, 'description'> & {
	prompt: string
}

export const runtime = 'edge'

export async function POST(req: Request) {
	const data: Data = await req.json()
	const { prompt, mode, tone, creativity, characters } = data

	const promptText = getPromt(mode, tone, characters, prompt)

	const body = JSON.stringify({
		model: 'command-xlarge-nightly',
		prompt: promptText,
		return_likelihoods: 'NONE',
		max_tokens: 300,
		temperature: parseInt(creativity),
		stream: true
	})

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
