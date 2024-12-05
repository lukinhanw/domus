import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input'
import { Checkbox } from '../ui/Checkbox'

const roleOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'sindico', label: 'Síndico' },
  { value: 'funcionario', label: 'Funcionário' },
  { value: 'morador', label: 'Morador' }
]

export function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    cpf: user?.cpf || '',
    password: '',
    role: user?.role || 'morador',
    status: user?.status ?? true
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Nome é obrigatório'
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório'
    if (!user && !formData.password) newErrors.password = 'Senha é obrigatória'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-20"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {user ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>

          <div className="space-y-6">
            <Input
              label="Nome"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            <Input
              label="CPF"
              required
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              error={errors.cpf}
            />

            {!user && (
              <Input
                type="password"
                label="Senha"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
              />
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cargo
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                {roleOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <Checkbox
              label="Usuário Ativo"
              checked={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
            />
          </div>
        </motion.form>

        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-3xl mx-auto flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-primary"
            >
              {user ? 'Salvar' : 'Cadastrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}