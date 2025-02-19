import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy, createContext, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import { MainHeader } from './components/layout/MainHeader'
import { useAuth } from './contexts/AuthContext'

export const SidebarContext = createContext()

export function useSidebar() {
	return useContext(SidebarContext)
}

const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Users = lazy(() => import('./pages/Users'))
const UserForm = lazy(() => import('./pages/UserForm'))

function PrivateRoute({ children }) {
	const { user } = useAuth()
	return user ? children : <Navigate to="/login" />
}

export default function App() {
	const { user } = useAuth()
	const [isExpanded, setIsExpanded] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	// Rotas onde a Sidebar não deve aparecer
	const noSidebarRoutes = ['/users/new', '/users/:id']
	const shouldShowSidebar = user && !noSidebarRoutes.some(route =>
		location.pathname.startsWith(route.replace(':id', ''))
	)

	// Configuração das ações do header baseado na rota atual
	const getHeaderActions = () => {
		const path = location.pathname
		
		if (path === '/users') {
			return [{
				label: 'Novo Usuário',
				onClick: () => navigate('/users/new')
			}]
		}
		
		return []
	}

	return (
		<SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
			<div className="min-h-screen bg-gradient-to-bl from-gray-100 to-gray-200 dark:bg-gray-900">
				{shouldShowSidebar && <Sidebar />}
				{shouldShowSidebar && <MainHeader actions={getHeaderActions()} />}
				<main className={shouldShowSidebar ? `pt-20 ${isExpanded ? 'ml-64' : 'ml-20'}` : ''}>
					<Suspense fallback={
						<div className="flex items-center justify-center min-h-screen">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
						</div>
					}>
						<Routes>
							<Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
							<Route path="/dashboard" element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							} />
							<Route path="/users" element={
								<PrivateRoute>
									<Users />
								</PrivateRoute>
							} />
							<Route path="/users/new" element={
								<PrivateRoute>
									<UserForm />
								</PrivateRoute>
							} />
							<Route path="/users/:id" element={
								<PrivateRoute>
									<UserForm />
								</PrivateRoute>
							} />
							<Route path="/" element={<Navigate to="/dashboard" />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</SidebarContext.Provider>
	)
}