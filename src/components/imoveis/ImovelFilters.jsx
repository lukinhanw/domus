import { useState } from 'react'
import { Input } from '../ui/Input'
import Select from 'react-select'
import { selectStyles } from '../../styles/selectStyles'

const tipoOptions = [
    { value: '', label: 'Todos os tipos' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'casa', label: 'Casa' }
]

const statusOptions = [
    { value: '', label: 'Todos os status' },
    { value: 'disponivel', label: 'Desocupado' },
    { value: 'vendido', label: 'Ocupado' },
    { value: 'alugado', label: 'Alugado' }
]

export function ImovelFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        search: '',
        tipo: '',
        status: ''
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
                        Buscar imóvel
                    </label>
                    <Input
                        placeholder="Descrição, bloco, apartamento, quadra, lote..."
                        value={filters.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                        className="w-full rounded-xl"
                        icon="search"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tipo
                    </label>
                    <Select
                        options={tipoOptions}
                        value={tipoOptions.find(option => option.value === filters.tipo)}
                        onChange={(option) => handleChange('tipo', option?.value || '')}
                        placeholder="Selecione o tipo"
                        isSearchable
                        isClearable
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
                        value={statusOptions.find(option => option.value === filters.status)}
                        onChange={(option) => handleChange('status', option?.value || '')}
                        placeholder="Selecione o status"
                        isSearchable
                        isClearable
                        styles={selectStyles}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                    />
                </div>
            </div>
        </div>
    )
}