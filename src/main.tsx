import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NavigationBar } from './components/navigation/NavigationBar'
import { App } from './App'
import './globalStyles.css'
import { DataContextProvider } from './context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataContextProvider>
      <BrowserRouter>
        <NavigationBar />
        <App />
      </BrowserRouter>
    </DataContextProvider>
  </React.StrictMode>
)
