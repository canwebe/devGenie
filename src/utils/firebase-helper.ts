import { db } from '@/lib/firebase'
import { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const createUser = async (user: User) => {
  const userDoc = doc(db, 'users', user?.uid)

  const userData = await getDoc(userDoc)

  if (!userData.exists()) {
    await setDoc(userDoc, {
      photoURL: user?.photoURL,
      uid: user?.uid,
    })
  }
}
