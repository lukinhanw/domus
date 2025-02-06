import { useState, useRef, useEffect } from 'react'
import { RiUser3Line, RiShieldUserLine, RiUpload2Line, RiCloseLine } from 'react-icons/ri'
import Select from 'react-select'
import { Input } from '../ui/Input'
import { Checkbox } from '../ui/Checkbox'

const roleOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'sindico', label: 'Síndico' },
    { value: 'funcionario', label: 'Funcionário' },
    { value: 'morador', label: 'Morador' },
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
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        cpf: user?.cpf || '',
        phone: user?.phone || '',
        password: '',
        role: user?.role || 'morador',
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
        files: user?.files || []
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
        if (formData.role === 'funcionario' && !formData.cargoFuncionario) {
            newErrors.cargoFuncionario = 'Cargo é obrigatório'
        }
        if (formData.role === 'inquilino' && !formData.proprietarioId) {
            newErrors.proprietarioId = 'Proprietário é obrigatório'
        }
        if (formData.files.some(file => file.size > 10 * 1024 * 1024)) {
            newErrors.files = 'Alguns arquivos excedem o limite de 10MB'
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

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-24">
            {/* Cabeçalho com Ícone */}
            <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-900/30 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/20 to-transparent"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
                    <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                    <div className="absolute -bottom-32 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
                </div>
                <div className="max-w-2xl mx-auto relative">
                    <div className="flex items-center space-x-6">
                        <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/5">
                            <RiUser3Line className="w-16 h-16 text-white/90" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white/90">
                                {user ? 'Editar Usuário' : 'Novo Usuário'}
                            </h2>
                            <p className="text-white/70 mt-1">
                                {user ? 'Atualize as informações do usuário conforme necessário' : 'Preencha as informações para criar um novo usuário'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Formulário */}
            <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 mb-24">
                <form className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <div className="space-y-8">
                        {/* Seção: Acesso */}
                        <div>
                            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 mb-4">
                                <RiShieldUserLine className="w-5 h-5" />
                                <h3 className="text-lg font-semibold">Acesso</h3>
                            </div>
                            <div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nível de Acesso
                                        <span className="text-danger-500 ml-1">*</span>
                                    </label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {roleOptions.map(option => (
                                            <div
                                                key={option.value}
                                                onClick={() => setFormData({ ...formData, role: option.value })}
                                                className={`
                                                    cursor-pointer rounded-lg p-2 text-center transition-all
                                                    border-2 hover:border-primary-500 text-sm
                                                    ${formData.role === option.value
                                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                                        : 'border-gray-200 dark:border-gray-700'
                                                    }
                                                `}
                                            >
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {option.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

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
                            </div>
                        </div>

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
                                />
                            </div>
                        </div>

                        {/* Seção: Informações Residenciais (apenas para moradores e inquilinos) */}
                        {(formData.role === 'morador' || formData.role === 'inquilino') && (
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
                    </div>
                </form>
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
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg
                                 transition-colors duration-200 font-medium"
                    >
                        {user ? 'Salvar' : 'Cadastrar'}
                    </button>
                </div>
            </div>
        </div>
    )
}