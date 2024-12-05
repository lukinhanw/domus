import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { showToast } from '../utils/toast'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true)
      const data = await loginUser(credentials)
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
      showToast.success(
        'Welcome back!',
        'You have successfully logged in'
      )
    } catch (error) {
      showToast.error(
        'Authentication Failed',
        error.message || 'Invalid credentials'
      )
      throw error
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/login')
    showToast.info(
      'Logged Out',
      'You have been successfully logged out'
    )
  }, [navigate])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)