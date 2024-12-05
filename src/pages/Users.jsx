import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserFilters } from '../components/users/UserFilters'
import { UserList } from '../components/users/UserList'
import { getUsers } from '../services/userService'
import { showToast } from '../utils/toast'

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
    <div className="pl-24 pr-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Usuários Administrativos
          </h1>
          <button
            onClick={() => navigate('/users/new')}
            className="btn-primary"
          >
            Novo Usuário
          </button>
        </div>

        <UserFilters onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
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
      </motion.div>
    </div>
  )
}