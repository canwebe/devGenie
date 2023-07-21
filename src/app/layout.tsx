import { ThemeProvider } from '@/components/theme-provider'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DevGenie | Craft a Standout Profile with AI Assistance',
  description:
    'Stand out from the crowd effortlessly. Our AI-driven platform helps you create compelling profiles, project descriptions, and experiences that showcase your skills and expertise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
