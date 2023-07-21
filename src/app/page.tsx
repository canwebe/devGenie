'use client'

import { useCompletion } from 'ai/react'

export default function Home() {
  const type = 'profile bio'
  const tone = 'formal'
  const characters = 120
  const creativity = 0.5
  const description =
    'experience developer, react,full stack under 120 characters'

  const { completion, handleSubmit, input, handleInputChange, isLoading } =
    useCompletion({
      body: {
        description,
        tone,
        characters,
        creativity,
        type,
      },
    })

  console.log('results', completion, isLoading)

  return (
    <main className="flex flex-col items-center justify-between">
      <h1 className="text-2xl font-bold">DevGenie</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button>{isLoading ? 'Loading' : 'Submit'}</button>
      </form>
      <p className="bg-slate-100 p-6 text-slate-900">{completion}</p>
    </main>
  )
}
