import Header from '@/components/header'
import MainForm from '@/components/mainForm'
import Nav from '@/components/navbar'
import ToastClient from '@/components/toastClient'
import { getGenerationCount, getUsersLists } from '@/lib/firebaseHelper'

export const revalidate = 60

export default async function Home() {
	const countData = getGenerationCount()
	const usersListData = getUsersLists()

	const [count, usersList] = await Promise.all([countData, usersListData])

	return (
		<div className='min-h-screen flex flex-col'>
			<Nav />
			<Header count={count} usersList={usersList} />
			<MainForm />
			<ToastClient />
		</div>
	)
}
