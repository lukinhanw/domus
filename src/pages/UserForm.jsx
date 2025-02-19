import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserForm as Form } from '../components/users/UserEditForm'
import { createUser, updateUser, getUser } from '../services/userService'

export default function UserForm({ setToast }) {
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
					setToast({
						type: 'error',
						message: 'Não foi possível carregar os dados do usuário'
					})
					navigate('/users')
				} finally {
					setLoading(false)
				}
			}
		}

		loadUser()
	}, [id, navigate, setToast])

	const handleSubmit = async (formData) => {
		try {
			setLoading(true)
			if (id) {
				await updateUser(parseInt(id), formData)
				setToast({
					type: 'success',
					message: `Usuário atualizado com sucesso`
				})
			} else {
				await createUser(formData)
				setToast({
					type: 'success',
					message: `Usuário criado com sucesso`
				})
			}
			navigate('/users')
		} catch (error) {
			setToast({
				type: 'error',
				message: error.message || 'Erro ao salvar usuário'
			})
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
			onCancel={() => {
				navigate('/users')
			}}
			loading={loading}
		/>
	)
}