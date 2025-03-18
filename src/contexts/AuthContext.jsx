import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { storageService } from '../services/storageService'
import { showToast } from '../utils/toast'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => storageService.getUser())
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		// Verifica se existe um usuário salvo e se o "Lembrar-me" está ativo
		const savedUser = storageService.getUser()
		const rememberMe = storageService.getRememberMe()
		
		if (savedUser && rememberMe) {
			setUser(savedUser)
		}
	}, [])

	const login = useCallback(async (credentials) => {
		try {
			setLoading(true)
			const data = await loginUser(credentials)
			setUser(data.user)
			storageService.setToken(data.token)
			storageService.setUser(data.user)
			storageService.setRememberMe(credentials.rememberMe)
			
			if (credentials.rememberMe) {
				storageService.setCredentials({
					email: credentials.email,
					password: credentials.password
				})
			} else {
				storageService.setCredentials(null)
			}

			navigate('/dashboard')
			showToast.success(
				'Bem vindo de volta!',
				'Você fez login com sucesso'
			)
		} catch (error) {
			showToast.error(
				'Falha na autenticação',
				error.message || 'Credenciais inválidas'
			)
			throw error
		} finally {
			setLoading(false)
		}
	}, [navigate])

	const logout = useCallback(() => {
		setUser(null)
		storageService.clear()
		navigate('/login')
		showToast.info(
			'Sair',
			'Você saiu do sistema com sucesso.'
		)
	}, [navigate])

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)