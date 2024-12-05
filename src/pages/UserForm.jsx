import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserForm as Form } from '../components/users/UserForm'
import { createUser, updateUser } from '../services/userService'
import { showToast } from '../utils/toast'

export default function UserForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

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

  return (
    <Form
      user={user}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/users')}
      loading={loading}
    />
  )
}