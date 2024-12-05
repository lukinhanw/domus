import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Input } from '../components/ui/Input'
import { showToast } from '../utils/toast'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const { login, loading } = useAuth()

  const validateForm = () => {
    const newErrors = {}
    
    if (!credentials.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!credentials.password) {
      newErrors.password = 'Password is required'
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      showToast.error(
        'Validation Error',
        'Please check the form for errors'
      )
      return
    }

    try {
      await login(credentials)
      showToast.success(
        'Welcome back!',
        'You have successfully logged in'
      )
    } catch (error) {
      showToast.error(
        'Login Failed',
        error.message || 'Please check your credentials'
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email address"
              required
              error={errors.email}
              value={credentials.email}
              onChange={(e) => {
                setCredentials(prev => ({ ...prev, email: e.target.value }))
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
              }}
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              required
              error={errors.password}
              value={credentials.password}
              onChange={(e) => {
                setCredentials(prev => ({ ...prev, password: e.target.value }))
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }))
              }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Sign in'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}