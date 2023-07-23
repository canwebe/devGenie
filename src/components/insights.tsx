import { getGenerationCount, getUsersLists } from '@/utils/firebase-helper'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function Insights() {
  const countData = getGenerationCount()
  const usersListData = getUsersLists()

  const [count, usersList] = await Promise.all([countData, usersListData])

  console.count('Insight re render')

  return (
    <div className="mb-6 text-center">
      <div className="mb-2 opacity-60">
        <p>Total Generation : {count.toString()}</p>
      </div>
      <div>
        <p className="mb-2 opacity-60">Recently Joined</p>
        <div className="flex justify-center">
          {usersList.map((user) => (
            <Image
              key={user?.uid}
              src={user?.photoURL}
              width={30}
              height={30}
              alt="user"
              className="rounded-full [&:not(:first-child)]:-translate-x-2 "
            />
          ))}
        </div>
      </div>
    </div>
  )
}
