import type { Metadata } from 'next'
import './globals.css'

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
        <header>
          <div className="logo">SaturnBooks</div>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#genres">Genres</a></li>
              <li><a href="#books">Library</a></li>
              <li><a href="/login" className="btn" style={{padding: '0.5rem 1.5rem'}}>Login</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Saturn Books. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
