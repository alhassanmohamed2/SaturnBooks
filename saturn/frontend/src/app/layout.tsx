import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Saturn Books | Expand Your Universe',
  description: 'Saturn Books is a premium platform for reading and exploring a universe of knowledge.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Saturn Books. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
