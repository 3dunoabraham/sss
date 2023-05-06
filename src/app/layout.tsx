import '@/../style/ims-theme.css'
import '@/../style/reset.css'
import '@/../style/css.css'
import { fetchSession } from '../../script/state/repository/session'
import AppClientProvider from "@/dom/organ/layout/AppClientProvider"

export const metadata = {
  title: 'IMSFront',
  description: 'Inventory Management System',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await fetchSession()
  // console.log("session", session)
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect"href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link rel="stylesheet" href={`
          https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap
        `}/>
      </head>
      <body className="ma-0 h-min-100vh" > 
        <AppClientProvider session={session}>
          <> {children}  </>
        </AppClientProvider>
      </body>
    </html>
  )
}