import { Separator } from '@/components/ui/seprator'

import Header from '@/components/header'
import MainForm from '@/components/mainForm'
import Nav from '@/components/nav'
import Insights from '@/components/insights'
import ToastClient from '@/components/toastClient'
import { getGenerationCount, getUsersLists } from '@/utils/firebase-helper'

export const revalidate = 60

export default async function Home() {
  const countData = getGenerationCount()
  const usersListData = getUsersLists()

  const [count, usersList] = await Promise.all([countData, usersListData])

  console.count('Re render')

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Header />
      <Insights count={count} usersList={usersList} />
      <MainForm />
      <ToastClient />
    </div>
  )
}
