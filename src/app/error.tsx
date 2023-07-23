'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="h-screen grid place-items-center">
      <div className="text-center">
        <h3 className="font-bold text-[24px] opacity-60 mb-2">
          Something Went Wrong!
        </h3>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  )
}
