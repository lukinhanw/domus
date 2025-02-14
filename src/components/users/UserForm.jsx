import { useState, useRef, useEffect } from 'react'
import { RiUser3Line, RiShieldUserLine, RiUpload2Line, RiCloseLine } from 'react-icons/ri'
import Select from 'react-select'
import { Input } from '../ui/Input'
import { Checkbox } from '../ui/Checkbox'
import { showToast } from '../../utils/toast'
import { PageHeader } from '../ui/PageHeader'
import { motion, AnimatePresence } from 'framer-motion'

const roleOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'sindico', label: 'Síndico' },
    { value: 'funcionario', label: 'Funcionário' },
    { value: 'proprietario', label: 'Proprietário' },
    { value: 'inquilino', label: 'Inquilino' }
]

const funcionarioOptions = [
    { value: 'jardineiro', label: 'Jardineiro' },
    { value: 'piscineiro', label: 'Piscineiro' },
    { value: 'porteiro', label: 'Porteiro' },
    { value: 'zelador', label: 'Zelador' },
    { value: 'seguranca', label: 'Segurança' },
    { value: 'manutencao', label: 'Manutenção' }
]

const blocoOptions = [
    { value: 'A', label: 'Bloco A' },
    { value: 'B', label: 'Bloco B' },
    { value: 'C', label: 'Bloco C' },
    { value: 'D', label: 'Bloco D' }
]

const quadraOptions = [
    { value: '1', label: 'Quadra 1' },
    { value: '2', label: 'Quadra 2' },
    { value: '3', label: 'Quadra 3' },
    { value: '4', label: 'Quadra 4' }
]

const loteOptions = [
    { value: '1', label: 'Lote 1' },
    { value: '2', label: 'Lote 2' },
    { value: '3', label: 'Lote 3' },
    { value: '4', label: 'Lote 4' },
    { value: '5', label: 'Lote 5' }
]

const proprietariosOptions = [
    { value: '1', label: 'João Silva - Quadra 1, Lote 2' },
    { value: '2', label: 'Maria Santos - Quadra 2, Lote 5' },
    { value: '3', label: 'Pedro Oliveira - Quadra 3, Lote 1' },
    { value: '4', label: 'Ana Souza - Quadra 1, Lote 4' },
    { value: '5', label: 'Carlos Ferreira - Quadra 4, Lote 3' },
    { value: '6', label: 'Beatriz Lima - Quadra 2, Lote 2' },
    { value: '7', label: 'Roberto Costa - Quadra 3, Lote 5' }
]

const selectStyles = {
    control: (base, state) => ({
        ...base,
        padding: '2px',
        borderRadius: '0.5rem',
        borderColor: state.isFocused ? '#6366F1' : '#D1D5DB',
        boxShadow: state.isFocused ? '0 0 0 1px #6366F1' : 'none',
        '&:hover': {
            borderColor: '#6366F1'
        }
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#6366F1' : state.isFocused ? '#E0E7FF' : 'transparent',
        color: state.isSelected ? 'white' : '#111827',
        '&:active': {
            backgroundColor: '#6366F1'
        }
    }),
    input: (base) => ({
        ...base,
        color: '#111827'
    }),
    singleValue: (base) => ({
        ...base,
        color: '#111827'
    })
}

export function UserForm({ user, onSubmit, onCancel }) {
    const [showForm, setShowForm] = useState(!!user)
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        cpf: user?.cpf || '',
        phone: user?.phone || '',
        password: '',
        role: user?.role || '',
        status: user?.status ?? true,
        apartment: user?.apartment || '',
        block: user?.block || '',
        quadra: user?.quadra || '',
        lote: user?.lote || '',
        numero: user?.numero || '',
        dataNascimento: user?.dataNascimento || '',
        notifications: user?.notifications ?? true,
        cargoFuncionario: user?.cargoFuncionario || '',
        proprietarioId: user?.proprietarioId || '',
        files: user?.files || [],
        veiculos: user?.veiculos || [{ tipo: '', marca: '', modelo: '', placa: '', cor: '' }]
    })

    const [errors, setErrors] = useState({})

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        const maxSize = 10 * 1024 * 1024 // 10MB

        const validFiles = files.filter(file => file.size <= maxSize)

        if (validFiles.length < files.length) {
            // Aqui você pode adicionar uma notificação de erro para arquivos muito grandes
            console.warn('Alguns arquivos foram ignorados por excederem 10MB')
        }

        setFormData(prev => ({
            ...prev,
            files: [...prev.files, ...validFiles.map(file => ({
                file,
                name: file.name,
                type: file.type,
                size: file.size,
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
            }))]
        }))
    }

    const removeFile = (index) => {
        setFormData(prev => {
            const newFiles = [...prev.files]
            if (newFiles[index].preview) {
                URL.revokeObjectURL(newFiles[index].preview)
            }
            newFiles.splice(index, 1)
            return { ...prev, files: newFiles }
        })
    }

    // Limpar URLs de preview quando o componente for desmontado
    useEffect(() => {
        return () => {
            formData.files.forEach(file => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview)
                }
            })
        }
    }, [])

    const validateForm = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = 'Nome é obrigatório'
        if (!formData.email) newErrors.email = 'E-mail é obrigatório'
        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório'
        if (!formData.phone) newErrors.phone = 'Telefone é obrigatório'
        if (!user && !formData.password) newErrors.password = 'Senha é obrigatória'
        if (!formData.role) newErrors.role = 'Nível de acesso é obrigatório'
        if (formData.role === 'funcionario' && !formData.cargoFuncionario) {
            newErrors.cargoFuncionario = 'Cargo é obrigatório'
        }
        if (formData.role === 'inquilino' && !formData.proprietarioId) {
            newErrors.proprietarioId = 'Proprietário é obrigatório'
        }
        if (formData.files.some(file => file.size > 10 * 1024 * 1024)) {
            newErrors.files = 'Alguns arquivos excedem o limite de 10MB'
        }

        // Validação dos veículos
        if (formData.veiculos.length > 0) {
            formData.veiculos.forEach((veiculo, index) => {
                if (veiculo.placa && !veiculo.cor) {
                    if (!newErrors.veiculos) newErrors.veiculos = {}
                    newErrors.veiculos[index] = { cor: 'Cor do veículo é obrigatória' }
                }
            })
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(formData)
        }
    }

    const consultarPlaca = async (placa, index) => {
        try {
            // Simulação temporária
            const mockResponse = {
                marca: 'VOLKSWAGEN',
                modelo: 'GOL 1.0',
                tipo: 'AUTOMOVEL'
            }
            
            const newVeiculos = [...formData.veiculos]
            newVeiculos[index] = {
                ...newVeiculos[index],
                marca: mockResponse.marca,
                modelo: mockResponse.modelo,
                tipo: mockResponse.tipo
            }
            setFormData({ ...formData, veiculos: newVeiculos })
            showToast.success('Veículo encontrado', 'Dados preenchidos automaticamente.')
        } catch (error) {
            showToast.error('Erro na consulta', 'Não foi possível consultar a placa. Verifique se a placa está correta.')
        }
    }

    const handleRoleSelect = (role) => {
        setFormData(prev => ({ ...prev, role }))
        setShowForm(true)
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-24">
            <PageHeader
                icon={RiUser3Line}
                title={user ? 'Editar Usuário' : 'Novo Usuário'}
                description={user ? 'Atualize as informações do usuário conforme necessário' : 'Preencha as informações para criar um novo usuário'}
            />

            <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                    <div className="space-y-8">
                        {/* Seção: Acesso */}
                        <div>
                            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-4">
                                <RiShieldUserLine className="w-5 h-5" />
                                <h3 className="text-lg font-semibold">Nível de Acesso</h3>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                {roleOptions.map(option => (
                                    <motion.div
                                        key={option.value}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleRoleSelect(option.value)}
                                        className={`
                                            cursor-pointer rounded-lg p-4 text-center transition-all
                                            border-2 hover:border-primary-500
                                            ${formData.role === option.value
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                : 'border-gray-200 dark:border-gray-700'
                                            }
                                        `}
                                    >
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {option.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence>
                            {showForm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {formData.role === 'funcionario' && (
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Cargo de Atuação
                                                <span className="text-danger-500 ml-1">*</span>
                                            </label>
                                            <Select
                                                options={funcionarioOptions}
                                                value={funcionarioOptions.find(option => option.value === formData.cargoFuncionario)}
                                                onChange={(option) => setFormData({ ...formData, cargoFuncionario: option.value })}
                                                styles={selectStyles}
                                                placeholder="Selecione o cargo"
                                                isSearchable
                                                noOptionsMessage={() => "Nenhum cargo encontrado"}
                                            />
                                            {errors.cargoFuncionario && (
                                                <p className="mt-1 text-sm text-danger-500">{errors.cargoFuncionario}</p>
                                            )}
                                        </div>
                                    )}

                                    {formData.role === 'inquilino' && (
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Proprietário do Imóvel
                                                <span className="text-danger-500 ml-1">*</span>
                                            </label>
                                            <Select
                                                options={proprietariosOptions}
                                                value={proprietariosOptions.find(option => option.value === formData.proprietarioId)}
                                                onChange={(option) => setFormData({ ...formData, proprietarioId: option?.value || '' })}
                                                styles={selectStyles}
                                                placeholder="Selecione o proprietário"
                                                isSearchable
                                                noOptionsMessage={() => "Nenhum proprietário encontrado"}
                                                formatOptionLabel={({ label }) => (
                                                    <div className="flex flex-col">
                                                        <span>{label.split('-')[0]}</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {label.split('-')[1]}
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                            {errors.proprietarioId && (
                                                <p className="mt-1 text-sm text-danger-500">{errors.proprietarioId}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Seção: Informações Básicas */}
                                    <div>
                                        <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-4">
                                            <RiShieldUserLine className="w-5 h-5" />
                                            <h3 className="text-lg font-semibold">Informações Básicas</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-2">
                        <Input
                                                    label="Nome Completo"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            error={errors.name}
                        />
                                            </div>
                                            <Input
                                                type="date"
                                                label="Data de Nascimento"
                                                required
                                                value={formData.dataNascimento}
                                                onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                                                error={errors.dataNascimento}
                                            />
                        <Input
                            label="CPF"
                            required
                            value={formData.cpf}
                            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                            error={errors.cpf}
                                                mask="cpf"
                                                placeholder="000.000.000-00"
                                            />
                                            <Input
                                                label="E-mail"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                error={errors.email}
                                            />
                                            <Input
                                                label="Telefone"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                error={errors.phone}
                                                mask="phone"
                                                placeholder="(00) 00000-0000"
                                            />
                                        </div>
                                    </div>

                                    {/* Seção: Informações Residenciais (apenas para proprietários e inquilinos) */}
                                    {(formData.role === 'proprietario' || formData.role === 'inquilino') && (
                                        <div>
                                            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-4">
                                                <RiShieldUserLine className="w-5 h-5" />
                                                <h3 className="text-lg font-semibold">Informações Residenciais</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Quadra
                                                    </label>
                                                    <Select
                                                        options={quadraOptions}
                                                        value={quadraOptions.find(option => option.value === formData.quadra)}
                                                        onChange={(option) => setFormData({ ...formData, quadra: option?.value || '' })}
                                                        styles={selectStyles}
                                                        placeholder="Selecione a quadra"
                                                        isSearchable
                                                        isClearable
                                                        noOptionsMessage={() => "Nenhuma quadra encontrada"}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Lote
                                                    </label>
                                                    <Select
                                                        options={loteOptions}
                                                        value={loteOptions.find(option => option.value === formData.lote)}
                                                        onChange={(option) => setFormData({ ...formData, lote: option?.value || '' })}
                                                        styles={selectStyles}
                                                        placeholder="Selecione o lote"
                                                        isSearchable
                                                        isClearable
                                                        noOptionsMessage={() => "Nenhum lote encontrado"}
                                                    />
                                                </div>
                                                <Input
                                                    label="Número"
                                                    value={formData.numero}
                                                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                                                />
                                                <Input
                                                    label="Apartamento"
                                                    value={formData.apartment}
                                                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                                                />
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Bloco
                                                    </label>
                                                    <Select
                                                        options={blocoOptions}
                                                        value={blocoOptions.find(option => option.value === formData.block)}
                                                        onChange={(option) => setFormData({ ...formData, block: option?.value || '' })}
                                                        styles={selectStyles}
                                                        placeholder="Selecione o bloco"
                                                        isSearchable
                                                        isClearable
                                                        noOptionsMessage={() => "Nenhum bloco encontrado"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Seção: Veículos */}
                                    {(formData.role === 'proprietario' || formData.role === 'inquilino') && (
                                        <div>
                                            <div className="flex items-center justify-between text-primary-600 dark:text-primary-400 mb-4">
                                                <div className="flex items-center space-x-2">
                                                    <RiShieldUserLine className="w-5 h-5" />
                                                    <h3 className="text-lg font-semibold">Veículos</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({
                                                        ...prev,
                                                        veiculos: [...prev.veiculos, { tipo: 'carro', marca: '', modelo: '', placa: '', cor: '' }]
                                                    }))}
                                                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 
                                                             dark:hover:text-primary-300 transition-colors duration-200"
                                                >
                                                    + Adicionar Veículo
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                {formData.veiculos.map((veiculo, index) => (
                                                    <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="w-full">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    <Input
                                                                        label="Placa"
                                                                        value={veiculo.placa}
                                                                        onChange={(e) => {
                                                                            const newVeiculos = [...formData.veiculos]
                                                                            newVeiculos[index].placa = e.target.value
                                                                            setFormData({ ...formData, veiculos: newVeiculos })
                                                                            
                                                                            const placa = e.target.value.replace(/[^a-zA-Z0-9]/g, '')
                                                                            if (placa.length === 7) {
                                                                                consultarPlaca(placa, index)
                                                                            }
                                                                        }}
                                                                        placeholder="ABC-1234 ou ABC1D23"
                                                                        mask="placa"
                                                                    />
                                                                    <Input
                                                                        label="Cor"
                                                                        value={veiculo.cor}
                                                                        onChange={(e) => {
                                                                            const newVeiculos = [...formData.veiculos]
                                                                            newVeiculos[index].cor = e.target.value
                                                                            setFormData({ ...formData, veiculos: newVeiculos })
                                                                            
                                                                            // Limpa o erro quando o usuário começa a digitar
                                                                            if (errors.veiculos?.[index]?.cor) {
                                                                                const newErrors = { ...errors }
                                                                                if (newErrors.veiculos?.[index]) {
                                                                                    delete newErrors.veiculos[index].cor
                                                                                    if (Object.keys(newErrors.veiculos[index]).length === 0) {
                                                                                        delete newErrors.veiculos[index]
                                                                                    }
                                                                                    if (Object.keys(newErrors.veiculos).length === 0) {
                                                                                        delete newErrors.veiculos
                                                                                    }
                                                                                }
                                                                                setErrors(newErrors)
                                                                            }
                                                                        }}
                                                                        placeholder="Ex: Prata"
                                                                        required={!!veiculo.placa}
                                                                        error={errors.veiculos?.[index]?.cor}
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                                    <Input
                                                                        label="Tipo"
                                                                        value={veiculo.tipo}
                                                                        onChange={(e) => {
                                                                            const newVeiculos = [...formData.veiculos]
                                                                            newVeiculos[index].tipo = e.target.value
                                                                            setFormData({ ...formData, veiculos: newVeiculos })
                                                                        }}
                                                                        disabled
                                                                    />
                                                                    <Input
                                                                        label="Marca"
                                                                        value={veiculo.marca}
                                                                        onChange={(e) => {
                                                                            const newVeiculos = [...formData.veiculos]
                                                                            newVeiculos[index].marca = e.target.value
                                                                            setFormData({ ...formData, veiculos: newVeiculos })
                                                                        }}
                                                                        disabled
                                                                    />
                                                                    <Input
                                                                        label="Modelo"
                                                                        value={veiculo.modelo}
                                                                        onChange={(e) => {
                                                                            const newVeiculos = [...formData.veiculos]
                                                                            newVeiculos[index].modelo = e.target.value
                                                                            setFormData({ ...formData, veiculos: newVeiculos })
                                                                        }}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newVeiculos = formData.veiculos.filter((_, i) => i !== index)
                                                                    setFormData({ ...formData, veiculos: newVeiculos })
                                                                }}
                                                                className="ml-4 text-danger-500 hover:text-danger-700 transition-colors duration-200"
                                                            >
                                                                <RiCloseLine className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Seção: Senha de Acesso */}
                        {!user && (
                                        <div>
                                            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-4">
                                                <RiShieldUserLine className="w-5 h-5" />
                                                <h3 className="text-lg font-semibold">Senha de Acesso</h3>
                                            </div>
                                            <div className="max-w-md">
                            <Input
                                type="password"
                                label="Senha"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                error={errors.password}
                            />
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números
                                                </p>
                                            </div>
                                        </div>
                        )}

                                    {/* Seção: Configurações */}
                        <div>
                                        <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-4">
                                            <RiShieldUserLine className="w-5 h-5" />
                                            <h3 className="text-lg font-semibold">Configurações</h3>
                        </div>
                                        <div className="space-y-4">
                        <Checkbox
                            label="Usuário Ativo"
                            checked={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                        />
                                            <Checkbox
                                                label="Receber notificações"
                                                description="O usuário receberá notificações sobre atualizações e eventos importantes"
                                                checked={formData.notifications}
                                                onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* Footer Fixo */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-20">
                <div className="max-w-2xl mx-auto px-4 py-4 flex justify-center space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                        className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg 
                                text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                                transition-colors duration-200"
                        >
                        {showForm && !user ? 'Voltar' : 'Cancelar'}
                        </button>
                    {showForm && (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-6 py-2.5 bg-primary-500 hover:bg-primary-700 text-white rounded-lg
                                    transition-colors duration-200 font-medium"
                        >
                            {user ? 'Salvar' : 'Cadastrar'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}