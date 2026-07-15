import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PlatformProvider } from './context/PlatformContext'
import './index.css'
import App from './App.jsx'

// Suppress known deprecation warnings from third-party libraries (e.g. THREE.Clock in R3F 9.x + Three 185)
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
    return;
  }
  originalWarn(...args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlatformProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlatformProvider>
  </StrictMode>,
)
