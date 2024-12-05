import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input'

const roleOptions = [
  { value: '', label: 'Todos os cargos' },
  { value: 'admin', label: 'Administrador' },
  { value: 'sindico', label: 'Síndico' },
  { value: 'funcionario', label: 'Funcionário' },
  { value: 'morador', label: 'Morador' }
]

export function UserFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: undefined
  })

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Buscar"
          placeholder="Nome ou CPF"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cargo
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            value={filters.role}
            onChange={(e) => handleChange('role', e.target.value)}
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
            value={filters.status === undefined ? '' : filters.status}
            onChange={(e) => handleChange('status', e.target.value === '' ? undefined : e.target.value === 'true')}
          >
            <option value="">Todos</option>
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}