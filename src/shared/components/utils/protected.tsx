import { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { selectToken } from '@/shared/lib/features/authSlice'

type ProtectedProps = {
  children: ReactNode
}

export const Protected = ({ children }: ProtectedProps) => {
  const token = useSelector(selectToken)
  const navigate = useNavigate()
  const location = useLocation()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')

    if ((!user || !token) && location.pathname !== '/login') {
      console.warn('[Protected] Redirecting to login...')
      navigate('/login', { replace: true })
      return
    }
    if (user && token) {
      setChecked(true)
    }
  }, [token, navigate, location.pathname])

  if (!checked && location.pathname !== '/login') {
    return <div>🔒 Checking authentication...</div>
  }

  return <>{children}</>
}
