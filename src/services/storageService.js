const TOKEN_KEY = 'token'
const USER_KEY = 'user'
const REMEMBER_ME_KEY = 'rememberMe'
const CREDENTIALS_KEY = 'savedCredentials'

export const storageService = {
    setToken: (token) => {
        localStorage.setItem(TOKEN_KEY, token)
    },

    getToken: () => {
        return localStorage.getItem(TOKEN_KEY)
    },

    setUser: (user) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    getUser: () => {
        const user = localStorage.getItem(USER_KEY)
        return user ? JSON.parse(user) : null
    },

    setRememberMe: (value) => {
        localStorage.setItem(REMEMBER_ME_KEY, value)
    },

    getRememberMe: () => {
        return localStorage.getItem(REMEMBER_ME_KEY) === 'true'
    },

    setCredentials: (credentials) => {
        localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials))
    },

    getCredentials: () => {
        const credentials = localStorage.getItem(CREDENTIALS_KEY)
        return credentials ? JSON.parse(credentials) : null
    },

    clear: () => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(REMEMBER_ME_KEY)
        localStorage.removeItem(CREDENTIALS_KEY)
    }
} 