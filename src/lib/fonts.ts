import { Inter as FontSans, JetBrains_Mono as FontMono } from 'next/font/google'
import localFont from 'next/font/local'

export const fontSansCD = localFont({
	src: '../styles/fonts/Clash_Display.woff2',
	display: 'swap',
	variable: '--font-sans-cd'
})

export const fontSans = FontSans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans'
})

export const fontMonoJBM = FontMono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-mono'
})
