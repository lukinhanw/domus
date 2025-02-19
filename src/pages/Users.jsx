import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserFilters } from '../components/users/UserFilters'
import { UserList } from '../components/users/UserList'
import { getUsers } from '../services/userService'
import { showToast } from '../utils/toast'
import { RiLoader4Line } from 'react-icons/ri'

export default function Users() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	const loadUsers = async (filters) => {
		try {
			setLoading(true)
			const data = await getUsers(filters)
			setUsers(data)
		} catch (error) {
			showToast.error(
				'Erro ao carregar usuários',
				'Não foi possível carregar a lista de usuários.'
			)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadUsers()
	}, [])

	const handleFilterChange = (filters) => {
		loadUsers(filters)
	}

	return (
		<div className="px-6 py-8">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							Usuários Administrativos
						</h1>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
							Gerencie os usuários do sistema e suas permissões
						</p>
					</div>
				</div>

				<UserFilters onFilterChange={handleFilterChange} />

				{loading ? (
					<div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
						<RiLoader4Line className="w-12 h-12 text-primary-500 animate-spin mb-4" />
						<p className="text-gray-600 dark:text-gray-400">Carregando usuários...</p>
					</div>
				) : users.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
						<p className="text-gray-600 dark:text-gray-400 mb-4">Nenhum usuário encontrado</p>
						<button
							onClick={() => navigate('/users/new')}
							className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium hover:bg-primary-50
											dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200">
							Adicionar usuário
						</button>
					</div>
				) : (
					<UserList
						users={users}
						onEdit={(user) => navigate(`/users/${user.id}`)}
						onDelete={(user) => {
							// Implementar lógica de exclusão
							showToast.success(
								'Usuário excluído',
								'O usuário foi excluído com sucesso.'
							)
							loadUsers()
						}}
					/>
				)}
			</div>
		</div>
	)
}