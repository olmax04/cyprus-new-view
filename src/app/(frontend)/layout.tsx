import React from 'react'
import { cookies } from 'next/headers'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const cookieStore = await cookies()
  const locale = cookieStore.get('site-locale')?.value || 'en'

  return (
    <html lang={locale}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
