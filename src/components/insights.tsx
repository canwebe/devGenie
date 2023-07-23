import { DocumentData } from 'firebase/firestore'
import Image from 'next/image'

export default async function Insights({
  count,
  usersList,
}: {
  count: number
  usersList: DocumentData[]
}) {
  console.count('Insight re render')

  return (
    <div className="mb-6 text-center">
      <div className="mb-2 opacity-60 text-[18px]">
        <p>Total Generation : {count.toString()}</p>
      </div>
      <div>
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
        <p className="mt-2 opacity-60">Recently Joined</p>
      </div>
    </div>
  )
}
