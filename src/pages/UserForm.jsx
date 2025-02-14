import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserForm as Form } from '../components/users/UserForm'
import { createUser, updateUser, getUser } from '../services/userService'
import { showToast } from '../utils/toast'

export default function UserForm() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const loadUser = async () => {
			if (id) {
				try {
					setLoading(true)
					const userData = await getUser(parseInt(id))
					setUser(userData)
				} catch (error) {
					showToast.error(
						'Erro ao carregar usuário',
						'Não foi possível carregar os dados do usuário.'
					)
					navigate('/users')
				} finally {
					setLoading(false)
				}
			}
		}

		loadUser()
	}, [id, navigate])

	const handleSubmit = async (formData) => {
		try {
			setLoading(true)
			if (id) {
				await updateUser(parseInt(id), formData)
				showToast.success(
					'Usuário atualizado',
					'As informações do usuário foram atualizadas com sucesso.'
				)
			} else {
				await createUser(formData)
				showToast.success(
					'Usuário criado',
					'O novo usuário foi criado com sucesso.'
				)
			}
			navigate('/users')
		} catch (error) {
			showToast.error(
				'Erro ao salvar',
				error.message || 'Não foi possível salvar as informações do usuário.'
			)
		} finally {
			setLoading(false)
		}
	}

	if (loading && id) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
			</div>
		)
	}

	return (
		<Form
			user={user}
			onSubmit={handleSubmit}
			onCancel={() => navigate('/users')}
			loading={loading}
		/>
	)
}