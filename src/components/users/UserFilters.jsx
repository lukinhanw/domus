import { useState } from 'react'
import { Input } from '../ui/Input'
import Select from 'react-select'
import { selectStyles } from '../../styles/selectStyles'

const roleOptions = [
	{ value: '', label: 'Todos os cargos' },
	{ value: 'admin', label: 'Administrador' },
	{ value: 'sindico', label: 'Síndico' },
	{ value: 'funcionario', label: 'Funcionário' },
	{ value: 'proprietario', label: 'Proprietário' }
]

const statusOptions = [
	{ value: '', label: 'Todos os status' },
	{ value: 'true', label: 'Ativo' },
	{ value: 'false', label: 'Inativo' }
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
		<div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Buscar usuário
					</label>
					<Input
						placeholder="Nome ou CPF"
						value={filters.search}
						onChange={(e) => handleChange('search', e.target.value)}
						className="w-full rounded-xl"
						icon="search"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Cargo
					</label>
					<Select
						options={roleOptions}
						value={roleOptions.find(option => option.value === filters.role)}
						onChange={(option) => handleChange('role', option?.value || '')}
						placeholder="Selecione o cargo"
						isSearchable
						isClearable
						classNamePrefix="select"
						noOptionsMessage={() => "Nenhum cargo encontrado"}
						styles={selectStyles}
						menuPortalTarget={document.body}
						menuPosition="fixed"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
						Status
					</label>
					<Select
						options={statusOptions}
						value={statusOptions.find(option => option.value === String(filters.status))}
						onChange={(option) => handleChange('status', option?.value === '' ? undefined : option?.value === 'true')}
						styles={selectStyles}
						placeholder="Selecione o status"
						isSearchable
						isClearable
						classNamePrefix="select"
						menuPortalTarget={document.body}
						menuPosition="fixed"
						noOptionsMessage={() => "Nenhum status encontrado"}
					/>
				</div>
			</div>
		</div>
	)
}