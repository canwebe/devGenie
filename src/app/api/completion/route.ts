import { Data } from '@/lib/types'
import { getPromt } from '@/lib/utils'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { CohereStream, StreamingTextResponse } from 'ai'
import { NextResponse } from 'next/server'

// For Running on Edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Getting the request data
  const data: Data = await req.json()

  // Destructuring the data object
  const { prompt, mode, tone, creativity, characters, uid } = data

  // Rate Limiter init
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(7, '2 m'),
  })

  const identifier = uid // Limited by userid

  const { success } = await ratelimit.limit(identifier)

  if (!success) {
    return NextResponse.json(
      { error: 'You are being Rate limited' },
      { status: 429 }
    )
  }

  // Getting the prompt based on type
  const promptText = getPromt(mode, tone, characters, prompt)

  // Body for POST request
  const body = JSON.stringify({
    model: 'command-xlarge-nightly',
    prompt: promptText,
    return_likelihoods: 'NONE',
    max_tokens: 250,
    temperature: Number(creativity),
    stream: true,
  })

  // Fetching POST request to cohere api
  const response = await fetch('https://api.cohere.ai/generate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      'Cohere-Version': '2022-12-06',
    },
    body,
  })

  const stream = CohereStream(response)

  return new StreamingTextResponse(stream)
}
