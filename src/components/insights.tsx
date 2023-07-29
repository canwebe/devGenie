import { InsightProps } from '@/lib/types'
import Image from 'next/image'

export default async function Insights({ count, usersList }: InsightProps) {
  return (
    <div className="text-center w-full flex flex-col gap-2 mt-1 md:mt-2">
      <p className="text-lg font-light text-primary/90">
        Generated {count.toString()} times so far.
      </p>
      <p className="text-xs mt-2 font-bold text-primary/50 uppercase">
        Recently Joined
      </p>
      <div className="flex justify-center items-center flex-row-reverse">
        {usersList.reverse().map((user) => (
          <Image
            key={user?.uid}
            src={user?.photoURL}
            width={36}
            height={36}
            alt={user?.name ? `${user?.name}'s avatar` : 'user profile avatar'}
            className="rounded-full dark:border-background border-2 [&:not(:first-child)]:-mr-3 [&:not(:first-child)]:shadow-2xl z-10"
          />
        ))}
      </div>
    </div>
  )
}
