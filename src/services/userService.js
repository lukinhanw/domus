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
	},
	{
		id: 4,
		name: 'Ana Souza',
		cpf: '789.123.456-00',
		role: 'proprietario',
		status: true,
		createdAt: '2024-03-12T16:45:00',
		phone: '(11) 98765-4321',
		email: 'ana@gmail.com'
	},
	{
		id: 5,
		name: 'Carlos Ferreira',
		cpf: '321.654.987-00',
		role: 'inquilino',
		status: true,
		createdAt: '2024-03-11T11:20:00'
	},
	{
		id: 6,
		name: 'Beatriz Lima',
		cpf: '654.987.321-00',
		role: 'funcionario',
		status: true,
		createdAt: '2024-03-10T13:40:00',
		phone: '(19) 98888-7777',
		email: 'beatriz@gmail.com'
	},
	{
		id: 7,
		name: 'Roberto Costa',
		cpf: '147.258.369-00',
		role: 'proprietario',
		status: false,
		createdAt: '2024-03-09T15:30:00'
	},
	{
		id: 8,
		name: 'Fernanda Alves',
		cpf: '258.369.147-00',
		role: 'sindico',
		status: true,
		createdAt: '2024-03-08T09:00:00',
		phone: '(19) 97777-6666'
	},
	{
		id: 9,
		name: 'Ricardo Santos',
		cpf: '369.147.258-00',
		role: 'inquilino',
		status: true,
		createdAt: '2024-03-07T14:20:00'
	},
	{
		id: 10,
		name: 'Juliana Pereira',
		cpf: '741.852.963-00',
		role: 'funcionario',
		status: true,
		createdAt: '2024-03-06T10:15:00',
		phone: '(19) 96666-5555',
		email: 'juliana@gmail.com'
	},
	{
		id: 11,
		name: 'Marcos Oliveira',
		cpf: '852.963.741-00',
		role: 'proprietario',
		status: true,
		createdAt: '2024-03-05T16:50:00'
	},
	{
		id: 12,
		name: 'Patricia Silva',
		cpf: '963.741.852-00',
		role: 'inquilino',
		status: false,
		createdAt: '2024-03-04T11:30:00'
	},
	{
		id: 13,
		name: 'Gabriel Martins',
		cpf: '159.357.456-00',
		role: 'funcionario',
		status: true,
		createdAt: '2024-03-03T13:25:00',
		phone: '(19) 95555-4444',
		email: 'gabriel@gmail.com'
	},
	{
		id: 14,
		name: 'Camila Rodrigues',
		cpf: '357.159.753-00',
		role: 'proprietario',
		status: true,
		createdAt: '2024-03-02T15:40:00'
	},
	{
		id: 15,
		name: 'Lucas Ferreira',
		cpf: '753.951.357-00',
		role: 'inquilino',
		status: true,
		createdAt: '2024-03-01T09:45:00'
	},
	{
		id: 16,
		name: 'Amanda Costa',
		cpf: '951.357.159-00',
		role: 'funcionario',
		status: true,
		createdAt: '2024-02-29T14:10:00',
		phone: '(19) 94444-3333',
		email: 'amanda@gmail.com'
	},
	{
		id: 17,
		name: 'Thiago Santos',
		cpf: '159.753.357-00',
		role: 'proprietario',
		status: false,
		createdAt: '2024-02-28T10:35:00'
	},
	{
		id: 18,
		name: 'Isabela Lima',
		cpf: '357.951.159-00',
		role: 'sindico',
		status: true,
		createdAt: '2024-02-27T16:20:00',
		phone: '(19) 93333-2222'
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