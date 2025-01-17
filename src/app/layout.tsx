import Layout from './components/layout'
import './globals.css'

export const metadata = {
  title: 'Teach Dashboard',
  description: 'Teaching dashboard application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}