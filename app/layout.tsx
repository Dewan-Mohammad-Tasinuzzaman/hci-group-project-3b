import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import NavBarTop from './NavBarTop'
import NavBarBottom from './NavBarBottom'
import "../styles/main.scss";

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grocery App',
  description: 'The Perfect Meal Planning App.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='layout'>
        <NavBarTop />
        {children}
        <NavBarBottom />
      </body>
    </html>
  )
}
