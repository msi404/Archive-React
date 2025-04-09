import { Outlet } from 'react-router-dom'
import { Providers } from '@/shared/providers'

export default function RootLayout ()
{
  return (
    <Providers>
      <main className='w-full p-6'>
        <Outlet />
      </main>
     </Providers>
  )
}
