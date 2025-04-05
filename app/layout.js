import './globals.css'

export const metadata = {
  title: 'Sail Reloaded Login',
  description: 'Login system for Sail Reloaded',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}