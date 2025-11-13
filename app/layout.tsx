import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clinica San Miguel Chatbot',
  description: 'Get instant answers about Clinica San Miguel services, pricing, and locations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
