import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Sidebar from './components/layout/Sidebar'
import { useAuth } from './contexts/AuthContext'

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

  return (
    <div className="min-h-screen bg-gradient-to-bl from-gray-100 to-gray-200 dark:bg-gray-900">
      {user && <Sidebar />}
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
    </div>
  )
}