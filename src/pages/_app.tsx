import { Outlet } from 'react-router-dom'
import { Providers } from '@/shared/providers'
import { Toaster } from '@/shared/components/ui/sonner'

export default function RootLayout ()
{
  return (
    <Providers>
      <section className='w-full pt-5'>
        <Outlet />
      </section>
      <Toaster richColors position='top-center'/>
     </Providers>
  )
}
