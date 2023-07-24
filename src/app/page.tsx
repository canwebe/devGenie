import Header from '@/components/header'
import MainForm from '@/components/mainForm'
import Nav from '@/components/nav'
import ToastClient from '@/components/toastClient'

export const revalidate = 1

export default async function Home() {
	console.count('Re render')

	return (
		<div className='min-h-screen flex flex-col'>
			<Nav />
			<Header />
			<MainForm />
			<ToastClient />
		</div>
	)
}
