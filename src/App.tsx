import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from '@generouted/react-router'

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>جاري التحميل...</div>}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  )
}
