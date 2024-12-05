import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '../ui/Input'
import { Checkbox } from '../ui/Checkbox'
import { useAuth } from '../../contexts/AuthContext'
import { showToast } from '../../utils/toast'

export function LoginForm() {
  const [step, setStep] = useState(1)
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem('savedCredentials')
    return saved ? JSON.parse(saved) : { email: '', password: '' }
  })
  const [rememberMe, setRememberMe] = useState(() => 
    localStorage.getItem('rememberMe') === 'true'
  )
  const [errors, setErrors] = useState({})
  const { login, loading } = useAuth()

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('savedCredentials', JSON.stringify(credentials))
      localStorage.setItem('rememberMe', 'true')
    } else {
      localStorage.removeItem('savedCredentials')
      localStorage.removeItem('rememberMe')
    }
  }, [rememberMe, credentials])

  const validateEmail = () => {
    if (!credentials.email) {
      setErrors({ email: 'O e-mail é obrigatório' })
      return false
    }
    if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      setErrors({ email: 'Formato de e-mail inválido' })
      return false
    }
    setErrors({})
    return true
  }

  const validatePassword = () => {
    if (!credentials.password) {
      setErrors({ password: 'A senha é obrigatória' })
      return false
    }
    if (credentials.password.length < 6) {
      setErrors({ password: 'A senha deve ter pelo menos 6 caracteres' })
      return false
    }
    setErrors({})
    return true
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (validateEmail()) {
      setStep(2)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validatePassword()) return

    try {
      await login(credentials)
    } catch (error) {
      showToast.error(
        'Falha no login',
        error.message || 'Verifique suas credenciais'
      )
    }
  }

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form
            key="email-form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleEmailSubmit}
            className="space-y-6"
          >
            <Input
              id="email"
              type="email"
              label="Email"
              required
              autoFocus
              error={errors.email}
              value={credentials.email}
              onChange={(e) => {
                setCredentials(prev => ({ ...prev, email: e.target.value }))
                if (errors.email) setErrors({})
              }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary w-full"
            >
              Continuar
            </motion.button>
          </motion.form>
        ) : (
          <motion.form
            key="password-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleLogin}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {credentials.email}
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Editar
                </button>
              </div>
              
              <Input
                id="password"
                type="password"
                label="Senha"
                required
                autoFocus
                error={errors.password}
                value={credentials.password}
                onChange={(e) => {
                  setCredentials(prev => ({ ...prev, password: e.target.value }))
                  if (errors.password) setErrors({})
                }}
              />

              <Checkbox
                label="Lembrar-me"
                description="Mantenha-me conectado neste dispositivo"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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
              ) : 'Entrar'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}