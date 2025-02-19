const MOCK_USERS = [
	{
		id: 1,
		name: 'João Silva',
		cpf: '123.456.789-00',
		role: 'admin',
		status: true,
		createdAt: '2024-03-15T10:00:00'
	},
	{
		id: 2,
		name: 'Maria Santos',
		cpf: '987.654.321-00',
		role: 'sindico',
		status: true,
		createdAt: '2024-03-14T14:30:00'
	},
	{
		id: 3,
		name: 'Pedro Oliveira',
		cpf: '456.789.123-00',
		role: 'funcionario',
		status: false,
		createdAt: '2024-03-13T09:15:00',
		phone: '(19) 99923-1231',
		email: 'pedro@gmail.com',
	}
]

export const getUsers = async (filters = {}) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			let filteredUsers = [...MOCK_USERS]

			if (filters.search) {
				const searchTerm = filters.search.toLowerCase()
				filteredUsers = filteredUsers.filter(user =>
					user.name.toLowerCase().includes(searchTerm) ||
					user.cpf.includes(searchTerm)
				)
			}

			if (filters.role) {
				filteredUsers = filteredUsers.filter(user => user.role === filters.role)
			}

			if (filters.status !== undefined) {
				filteredUsers = filteredUsers.filter(user => user.status === filters.status)
			}

			resolve(filteredUsers)
		}, 500)
	})
}

export const getUser = async (id) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const user = MOCK_USERS.find(user => user.id === id)
			if (!user) {
				reject(new Error('Usuário não encontrado'))
				return
			}
			resolve(user)
		}, 500)
	})
}

export const createUser = async (userData) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const newUser = {
				id: MOCK_USERS.length + 1,
				...userData,
				createdAt: new Date().toISOString()
			}
			MOCK_USERS.push(newUser)
			resolve(newUser)
		}, 500)
	})
}

export const updateUser = async (id, userData) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const userIndex = MOCK_USERS.findIndex(user => user.id === id)
			if (userIndex === -1) {
				reject(new Error('Usuário não encontrado'))
				return
			}
			MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...userData }
			resolve(MOCK_USERS[userIndex])
		}, 500)
	})
}

export const deleteUser = async (id) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const userIndex = MOCK_USERS.findIndex(user => user.id === id)
			if (userIndex === -1) {
				reject(new Error('Usuário não encontrado'))
				return
			}
			MOCK_USERS.splice(userIndex, 1)
			resolve(true)
		}, 500)
	})
}