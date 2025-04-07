import { Outlet } from 'react-router-dom'

export default function RootLayout ()
{
  return (
    <div>
      <header>My App Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
