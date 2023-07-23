type Mode = 'profile' | 'project' | 'experience'

type Tone =
	| 'appreciative'
	| 'assertive'
	| 'convincing'
	| 'candid'
	| 'casual'
	| 'cautionary'
	| 'critical'
	| 'enthusiastic'
	| 'formal'
	| 'funny'
	| 'humble'
	| 'informative'
	| 'joyful'
	| 'worried'
	| 'urgent'
	| 'thoughtful'
	| 'passionate'

type CreativityKeys = 'none' | 'low' | 'medium' | 'high' | 'max'

// none: 0 // low: 0.25 // medium: 0.5 // high: 0.75 // max: 1
type Creativity = {
	[key in CreativityKeys]: number
}

export type { Mode, Tone, Creativity }
