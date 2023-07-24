import { getApp, getApps, initializeApp } from 'firebase/app'
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// INIT
const configFirebase = {
	apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_APP_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_APP_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_APP_ID
}

const app = getApps().length === 0 ? initializeApp(configFirebase) : getApp()

// DB
export const db = getFirestore(app)

// Auth
export const auth = getAuth(app)

export const GoogleProvider = new GoogleAuthProvider()
export const GithubProvider = new GithubAuthProvider()
