import { Separator } from '@/components/ui/seprator'

import Header from '@/components/header'
import MainForm from '@/components/mainForm'
import Nav from '@/components/nav'
import Insights from '@/components/insights'
import ToastClient from '@/components/toastClient'

export default function Home() {
  console.count('Re render')

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Header />
      <Insights />
      <MainForm />
      <ToastClient />
    </div>
  )
}
