import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { AuthProvider } from './hooks/auth';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <App />
  </AuthProvider>
  // <React.StrictMode>

  // </React.StrictMode>,
)
