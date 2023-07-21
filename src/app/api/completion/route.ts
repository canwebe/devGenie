// API/COMPLETION

import { getPromt } from '@/utils/helper'
import { CohereStream, StreamingTextResponse } from 'ai'

interface data {
  description: string
  type: string
  tone: string
  creativity: number
  characters: number
}

// For Running on Edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Getting the request data
  const data: data = await req.json()

  // Destructuring the data object
  const { description, type, tone, creativity, characters } = data

  // Getting the prompt based on type
  const prompt = getPromt(type, tone, description)

  // Body for POST request
  const body = JSON.stringify({
    model: 'command-xlarge-nightly',
    prompt: prompt,
    return_likelihoods: 'NONE',
    max_tokens: characters * 3, // size of the response text
    temperature: creativity, // randomness
    stream: true, // For streaming response
  })

  // Fetching POST request to cohere api
  const response = await fetch('https://api.cohere.ai/generate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COHERE_API_KEY!}`,
      'Cohere-Version': '2022-12-06',
    },
    body,
  })

  const stream = CohereStream(response)

  return new StreamingTextResponse(stream)
}
