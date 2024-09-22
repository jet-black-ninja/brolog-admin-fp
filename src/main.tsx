import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { ThemeContextProvider } from './contexts/ThemeContext.tsx'
import { FilterContextProvider } from './contexts/FilterContext.tsx'
import App from './App.tsx'
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <FilterContextProvider>
            <App />
          </FilterContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </HashRouter>
  </StrictMode>,
)
