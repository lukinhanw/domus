import { useState, useEffect } from 'react'
import { RiUser3Line, RiCloseLine, RiAddLine, RiCarLine } from 'react-icons/ri'
import { Input } from '../ui/Input'
import Select from 'react-select'
import { selectStyles } from '../../styles/selectStyles'
import { createUser } from '../../services/userService'

const corOptions = [
    { value: 'preto', label: 'Preto' },
    { value: 'branco', label: 'Branco' },
    { value: 'prata', label: 'Prata' },
    { value: 'vermelho', label: 'Vermelho' },
    { value: 'azul', label: 'Azul' },
    { value: 'verde', label: 'Verde' },
    { value: 'amarelo', label: 'Amarelo' },
    { value: 'cinza', label: 'Cinza' },
    { value: 'marrom', label: 'Marrom' },
    { value: 'outro', label: 'Outro' }
]

const tipoVeiculoOptions = [
    { value: 'carro', label: 'Carro' },
    { value: 'moto', label: 'Moto' },
    { value: 'caminhonete', label: 'Caminhonete' },
    { value: 'outro', label: 'Outro' }
]

export function QuickUserForm({ isOpen, onClose, onSuccess, defaultRole = 'proprietario' }) {
    const initialFormData = {
        name: '',
        email: '',
        cpf: '',
        phone: '',
        role: defaultRole,
        status: true,
        veiculos: []
    }
    
    const initialVeiculoData = {
        tipo: '',
        marca: '',
        modelo: '',
        placa: '',
        cor: ''
    }
    
    const [formData, setFormData] = useState(initialFormData)
    
    // Filtrar as opções de papel com base no defaultRole
    const roleOption = defaultRole === 'proprietario' 
        ? { value: 'proprietario', label: 'Proprietário' }
        : { value: 'inquilino', label: 'Inquilino' }
    
    const [novoVeiculo, setNovoVeiculo] = useState(initialVeiculoData)
    const [mostrarFormVeiculo, setMostrarFormVeiculo] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    
    // Reiniciar o formulário quando ele é fechado
    useEffect(() => {
        if (!isOpen) {
            resetForm()
        }
    }, [isOpen])
    
    // Função para limpar todos os campos do formulário
    const resetForm = () => {
        setFormData(initialFormData)
        setNovoVeiculo(initialVeiculoData)
        setMostrarFormVeiculo(false)
        setErrors({})
    }
    
    // Função para fechar o modal e limpar os campos
    const handleClose = () => {
        resetForm()
        onClose()
    }
    
    if (!isOpen) return null

    const formatarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '')
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        return cpf
    }

    const formatarTelefone = (telefone) => {
        telefone = telefone.replace(/\D/g, '')
        if (telefone.length > 11) telefone = telefone.substring(0, 11)
        if (telefone.length > 10) {
            telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')
        } else if (telefone.length > 6) {
            telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3')
        } else if (telefone.length > 2) {
            telefone = telefone.replace(/^(\d{2})(\d{0,5})/, '($1) $2')
        } else if (telefone.length > 0) {
            telefone = telefone.replace(/^(\d*)/, '($1')
        }
        return telefone
    }

    const formatarPlaca = (placa) => {
        placa = placa.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
        if (placa.length > 7) placa = placa.substring(0, 7)
        if (placa.length > 3) {
            placa = placa.replace(/^([A-Z]{3})(\d.*)/, '$1-$2')
        }
        return placa
    }

    const handleCPFChange = (e) => {
        const cpfFormatado = formatarCPF(e.target.value)
        setFormData({ ...formData, cpf: cpfFormatado })
    }

    const handleTelefoneChange = (e) => {
        const telefoneFormatado = formatarTelefone(e.target.value)
        setFormData({ ...formData, phone: telefoneFormatado })
    }

    const handlePlacaChange = (e) => {
        const placaFormatada = formatarPlaca(e.target.value)
        setNovoVeiculo({ ...novoVeiculo, placa: placaFormatada })
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = 'Nome é obrigatório'
        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório'

        // Validação de email básica
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateVeiculo = () => {
        const newErrors = {}
        if (!novoVeiculo.placa) newErrors.placa = 'Placa é obrigatória'
        if (!novoVeiculo.marca) newErrors.marca = 'Marca é obrigatória'
        if (!novoVeiculo.modelo) newErrors.modelo = 'Modelo é obrigatório'
        if (!novoVeiculo.cor) newErrors.cor = 'Cor é obrigatória'
        if (!novoVeiculo.tipo) newErrors.tipo = 'Tipo é obrigatório'

        setErrors(prev => ({ ...prev, veiculo: newErrors }))
        return Object.keys(newErrors).length === 0
    }

    const adicionarVeiculo = () => {
        if (!validateVeiculo()) return

        setFormData({
            ...formData,
            veiculos: [...formData.veiculos, novoVeiculo]
        })

        setNovoVeiculo({
            tipo: '',
            marca: '',
            modelo: '',
            placa: '',
            cor: ''
        })

        setMostrarFormVeiculo(false)
        setErrors(prev => ({ ...prev, veiculo: {} }))
    }

    const removerVeiculo = (index) => {
        setFormData({
            ...formData,
            veiculos: formData.veiculos.filter((_, i) => i !== index)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return
        
        // Garantir que o role seja o que foi passado como defaultRole
        const userData = {
            ...formData,
            role: defaultRole
        }

        try {
            setLoading(true)
            const newUser = await createUser(userData)
            onSuccess({
                value: Number(newUser.id),
                label: newUser.name
            })
            onClose()
        } catch (error) {
            console.error('Erro ao criar usuário:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <RiUser3Line className="text-primary-500 w-5 h-5" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Cadastro Rápido de {formData.role === 'proprietario' ? 'Proprietário' : 'Inquilino'}
                        </h3>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <RiCloseLine className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tipo de Usuário
                            </label>
                            <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                                {roleOption.label}
                            </div>
                        </div>

                        <div>
                            <Input
                                label="Nome completo"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                error={errors.name}
                                required
                            />
                        </div>

                        <div>
                            <Input
                                label="CPF"
                                value={formData.cpf}
                                onChange={handleCPFChange}
                                error={errors.cpf}
                                required
                                maxLength={14}
                            />
                        </div>

                        <div>
                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                error={errors.email}
                            />
                        </div>

                        <div>
                            <Input
                                label="Telefone"
                                value={formData.phone}
                                onChange={handleTelefoneChange}
                                maxLength={15}
                            />
                        </div>
                    </div>

                    {/* Seção de Veículos */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Veículos
                            </h4>
                            <button
                                type="button"
                                onClick={() => setMostrarFormVeiculo(true)}
                                className="flex items-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                            >
                                <RiAddLine className="mr-1" />
                                Adicionar Veículo
                            </button>
                        </div>

                        {/* Lista de veículos */}
                        {formData.veiculos.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                {formData.veiculos.map((veiculo, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {veiculo.marca} {veiculo.modelo}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {veiculo.placa} • {veiculo.tipo} • {veiculo.cor}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removerVeiculo(index)}
                                            className="text-danger-500 hover:text-danger-700"
                                        >
                                            <RiCloseLine className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Formulário de novo veículo */}
                        {mostrarFormVeiculo && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Novo Veículo
                                    </h5>
                                    <button
                                        type="button"
                                        onClick={() => setMostrarFormVeiculo(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <RiCloseLine className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {/* Campo de placa isolado em cima */}
                                    <Input
                                        label="Placa"
                                        value={novoVeiculo.placa}
                                        onChange={handlePlacaChange}
                                        error={errors.veiculo?.placa}
                                        placeholder="AAA-0000"
                                    />
                                    
                                    {/* Grid 2x2 com os campos tipo, marca, cor e modelo */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Tipo - primeira célula */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Tipo
                                            </label>
                                            <Select
                                                options={tipoVeiculoOptions}
                                                value={tipoVeiculoOptions.find(option => option.value === novoVeiculo.tipo)}
                                                onChange={(option) => setNovoVeiculo({ ...novoVeiculo, tipo: option?.value || '' })}
                                                styles={selectStyles}
                                                menuPortalTarget={document.body}
                                                menuPosition="fixed"
                                                placeholder="Selecione"
                                            />
                                            {errors.veiculo?.tipo && (
                                                <p className="mt-1 text-xs text-danger-500">{errors.veiculo.tipo}</p>
                                            )}
                                        </div>
                                        
                                        {/* Cor - segunda célula */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Cor
                                            </label>
                                            <Select
                                                options={corOptions}
                                                value={corOptions.find(option => option.value === novoVeiculo.cor)}
                                                onChange={(option) => setNovoVeiculo({ ...novoVeiculo, cor: option?.value || '' })}
                                                styles={selectStyles}
                                                menuPortalTarget={document.body}
                                                menuPosition="fixed"
                                                placeholder="Selecione"
                                            />
                                            {errors.veiculo?.cor && (
                                                <p className="mt-1 text-xs text-danger-500">{errors.veiculo.cor}</p>
                                            )}
                                        </div>
                                        
                                        {/* Marca - terceira célula */}
                                        <div>
                                            <Input
                                                label="Marca"
                                                value={novoVeiculo.marca}
                                                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, marca: e.target.value })}
                                                error={errors.veiculo?.marca}
                                            />
                                        </div>
                                        
                                        {/* Modelo - quarta célula */}
                                        <div>
                                            <Input
                                                label="Modelo"
                                                value={novoVeiculo.modelo}
                                                onChange={(e) => setNovoVeiculo({ ...novoVeiculo, modelo: e.target.value })}
                                                error={errors.veiculo?.modelo}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-3">
                                    <button
                                        type="button"
                                        onClick={adicionarVeiculo}
                                        className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        Adicionar Veículo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Salvando...' : 'Salvar Usuário'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 