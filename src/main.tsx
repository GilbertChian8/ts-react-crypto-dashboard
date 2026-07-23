import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FavoriteProvider from './context/FavoriteProvider.tsx'
import ThemeProvider from './context/ThemeProvider.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FavoriteProvider>
          <App />
        </FavoriteProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
