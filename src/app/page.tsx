import Header from '@/components/header'
import MainForm from '@/components/mainForm'
import Navbar from '@/components/navbar'
import ToastClient from '@/components/toastClient'

export const revalidate = 1

export default async function Home() {
	return (
		<div className='min-h-screen flex flex-col'>
			<Navbar />
			<Header />
			<MainForm />
			<ToastClient />
		</div>
	)
}
