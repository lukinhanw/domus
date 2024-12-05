import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<AuthProvider>
					<App />
					<Toaster position="top-right" />
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>,
)