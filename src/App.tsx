import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from '@generouted/react-router'
import { ClipLoader } from 'react-spinners'

// Centering styles for the loader
const loaderContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Full viewport height
  width: '100vw'   // Full viewport width
};

export default function App() {
  return (
    <BrowserRouter>
      <Suspense 
        fallback={
          <div style={loaderContainerStyle}> 
            <ClipLoader
              color={"hsl(var(--primary))"} // Use primary theme color
              loading={true} // Always true for Suspense fallback
              size={60} // Adjust size as needed
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        }
      >
        <Routes />
      </Suspense>
    </BrowserRouter>
  )
}
