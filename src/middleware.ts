import { Data } from '@/lib/types'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
	const ip = request.ip
	const data: Data = await request.json()

	const uid = data.uid || (ip ?? 'anonymous')

	// Rate Limiter init
	const ratelimit = new Ratelimit({
		redis: Redis.fromEnv(),
		limiter: Ratelimit.slidingWindow(7, '2 m')
	})

	const identifier = uid // Limited by userid

	const { success } = await ratelimit.limit(identifier)

	if (!success) {
		return NextResponse.json(
			{ error: 'You are being Rate limited' },
			{ status: 429 }
		)
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/api/completion'
}
