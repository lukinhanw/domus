import { useState, useEffect } from 'react'
import { RiHome2Line, RiUpload2Line, RiCloseLine, RiAddLine } from 'react-icons/ri'
import Select from 'react-select'
import { Input } from '../ui/Input'
import { PageHeader } from '../ui/PageHeader'
import { motion } from 'framer-motion'
import { selectStyles } from '../../styles/selectStyles'
import { getUsers } from '../../services/userService'
import { QuickUserForm } from '../users/QuickUserForm'

const tipoOptions = [
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'casa', label: 'Casa' }
]

const statusOptions = [
    { value: 'disponivel', label: 'Desocupado' },
    { value: 'vendido', label: 'Ocupado' },
    { value: 'alugado', label: 'Alugado' },
    { value: 'embargado', label: 'Embargado' }
]

export function ImovelForm({ imovel, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        tipo: imovel?.tipo || '',
        descricao: imovel?.descricao || '',
        vagas: imovel?.vagas || '',
        vagasInfo: imovel?.vagasInfo || [],
        status: imovel?.status || 'disponivel',
        proprietarioId: imovel?.proprietarioId ? Number(imovel.proprietarioId) : '',
        inquilinoId: imovel?.inquilinoId ? Number(imovel.inquilinoId) : '',
        // Campos específicos para apartamento
        bloco: imovel?.bloco || '',
        apartamento: imovel?.apartamento || '',
        andar: imovel?.andar || '',
        // Campos específicos para casa
        quadra: imovel?.quadra || '',
        lote: imovel?.lote || '',
        numeroLote: imovel?.numeroLote || '',
        documentos: imovel?.documentos || []
    })

    const [errors, setErrors] = useState({})
    const [proprietarios, setProprietarios] = useState([])
    const [inquilinos, setInquilinos] = useState([])

    // Estados para controlar os modais de cadastro rápido
    const [showProprietarioForm, setShowProprietarioForm] = useState(false)
    const [showInquilinoForm, setShowInquilinoForm] = useState(false)

    useEffect(() => {
        const carregarProprietarios = async () => {
            try {
                const users = await getUsers({ role: 'proprietario' })
                const proprietariosOptions = users.map(user => ({
                    value: Number(user.id),
                    label: user.name
                }))
                setProprietarios(proprietariosOptions)
            } catch (error) {
                console.error('Erro ao carregar proprietários:', error)
            }
        }

        const carregarInquilinos = async () => {
            try {
                const users = await getUsers({ role: 'inquilino' })
                setInquilinos(users.map(user => ({
                    value: Number(user.id),
                    label: user.name
                })))
            } catch (error) {
                console.error('Erro ao carregar inquilinos:', error)
            }
        }

        carregarProprietarios()
        carregarInquilinos()

        // Inicializa as informações de vagas se existirem
        if (formData.vagas && parseInt(formData.vagas) > 0 && (!formData.vagasInfo || formData.vagasInfo.length === 0)) {
            const numeroVagas = parseInt(formData.vagas)
            const novasVagas = Array(numeroVagas).fill().map((_, i) => ({
                id: Date.now() + i,
                numero: ''
            }))

            setFormData(prev => ({
                ...prev,
                vagasInfo: novasVagas
            }))
        }
    }, [])

    const getProprietarioSelecionado = () => {
        if (!proprietarios || proprietarios.length === 0) {
            return null;
        }

        const proprietarioId = Number(formData.proprietarioId);
        return proprietarios.find(p => p.value === proprietarioId);
    }

    const handleVagasChange = (e) => {
        const novoNumeroVagas = parseInt(e.target.value) || 0
        const vagasAtuais = [...formData.vagasInfo]

        if (novoNumeroVagas > vagasAtuais.length) {
            // Adicionar mais vagas
            const novasVagas = Array(novoNumeroVagas - vagasAtuais.length).fill().map((_, i) => ({
                id: Date.now() + i,
                numero: ''
            }))

            setFormData({
                ...formData,
                vagas: e.target.value,
                vagasInfo: [...vagasAtuais, ...novasVagas]
            })
        } else if (novoNumeroVagas < vagasAtuais.length) {
            // Remover vagas excedentes
            setFormData({
                ...formData,
                vagas: e.target.value,
                vagasInfo: vagasAtuais.slice(0, novoNumeroVagas)
            })
        } else {
            // Mesmo número, só atualiza o valor
            setFormData({
                ...formData,
                vagas: e.target.value
            })
        }
    }

    const atualizarInfoVaga = (id, numero) => {
        setFormData({
            ...formData,
            vagasInfo: formData.vagasInfo.map(vaga =>
                vaga.id === id ? { ...vaga, numero } : vaga
            )
        })
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        const maxSize = 10 * 1024 * 1024 // 10MB

        const validFiles = files.filter(file => file.size <= maxSize)

        if (validFiles.length < files.length) {
            setErrors(prev => ({
                ...prev,
                documentos: 'Alguns arquivos foram ignorados por excederem 10MB'
            }))
        }

        setFormData(prev => ({
            ...prev,
            documentos: [...prev.documentos, ...validFiles.map(file => ({
                id: Date.now(),
                nome: file.name,
                tipo: file.type,
                tamanho: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
                dataUpload: new Date().toISOString()
            }))]
        }))
    }

    const removeFile = (id) => {
        setFormData(prev => ({
            ...prev,
            documentos: prev.documentos.filter(doc => doc.id !== id)
        }))
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.tipo) newErrors.tipo = 'Tipo é obrigatório'

        // Validações específicas para apartamento
        if (formData.tipo === 'apartamento') {
            if (!formData.bloco) newErrors.bloco = 'Bloco é obrigatório'
            if (!formData.apartamento) newErrors.apartamento = 'Número do apartamento é obrigatório'
            if (!formData.andar) newErrors.andar = 'Andar é obrigatório'
        }

        // Validações específicas para casa
        if (formData.tipo === 'casa') {
            if (!formData.quadra) newErrors.quadra = 'Quadra é obrigatória'
            if (!formData.lote) newErrors.lote = 'Lote é obrigatório'
        }

        // Validação para inquilino quando status é alugado
        if (formData.status === 'alugado' && !formData.inquilinoId) {
            newErrors.inquilinoId = 'Selecione um inquilino'
        }

        // Validação para números das vagas
        if (formData.vagasInfo.some(vaga => !vaga.numero)) {
            newErrors.vagasInfo = 'Informe o número de todas as vagas'
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
            <PageHeader
                icon={RiHome2Line}
                title={imovel ? 'Editar Imóvel' : 'Novo Imóvel'}
                description={imovel ? 'Atualize as informações do imóvel' : 'Cadastre um novo imóvel'}
            />

            <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Informações Básicas */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Informações Básicas
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tipo
                                    </label>
                                    <Select
                                        options={tipoOptions}
                                        value={tipoOptions.find(option => option.value === formData.tipo)}
                                        onChange={(option) => setFormData({ ...formData, tipo: option?.value })}
                                        styles={selectStyles}
                                        menuPortalTarget={document.body}
                                        menuPosition="fixed"
                                        placeholder="Selecione o tipo"
                                    />
                                    {errors.tipo && (
                                        <p className="mt-1 text-sm text-danger-500">{errors.tipo}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Status
                                    </label>
                                    <Select
                                        options={statusOptions}
                                        value={statusOptions.find(option => option.value === formData.status)}
                                        onChange={(option) => setFormData({ ...formData, status: option?.value })}
                                        styles={selectStyles}
                                        menuPortalTarget={document.body}
                                        menuPosition="fixed"
                                        placeholder="Selecione o status"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Input
                                        label="Descrição"
                                        value={formData.descricao}
                                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                        error={errors.descricao}
                                        multiline
                                        rows={3}
                                    />
                                </div>

                                <Input
                                    label="Vagas de Garagem"
                                    type="number"
                                    value={formData.vagas}
                                    onChange={handleVagasChange}
                                    error={errors.vagas}
                                />
                            </div>
                        </div>

                        {/* Campos para Vagas de Garagem */}
                        {formData.vagasInfo && formData.vagasInfo.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Informações das Vagas
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {formData.vagasInfo.map((vaga, index) => (
                                        <Input
                                            key={vaga.id}
                                            label={`Vaga ${index + 1} (número/identificação)`}
                                            value={vaga.numero}
                                            onChange={(e) => atualizarInfoVaga(vaga.id, e.target.value)}
                                            error={errors.vagasInfo && index === 0 ? errors.vagasInfo : null}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Campos específicos por tipo */}
                        {formData.tipo && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    {formData.tipo === 'apartamento' ? 'Informações do Apartamento' : 'Informações da Casa'}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {formData.tipo === 'apartamento' ? (
                                        <>
                                            <Input
                                                label="Bloco / Quadra"
                                                value={formData.bloco}
                                                onChange={(e) => setFormData({ ...formData, bloco: e.target.value })}
                                                error={errors.bloco}
                                                required
                                            />
                                            <Input
                                                label="Apartamento"
                                                value={formData.apartamento}
                                                onChange={(e) => setFormData({ ...formData, apartamento: e.target.value })}
                                                error={errors.apartamento}
                                                required
                                            />
                                            <Input
                                                label="Andar"
                                                type="number"
                                                value={formData.andar}
                                                onChange={(e) => setFormData({ ...formData, andar: e.target.value })}
                                                error={errors.andar}
                                                required
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Input
                                                label="Bloco / Quadra"
                                                value={formData.quadra}
                                                onChange={(e) => setFormData({ ...formData, quadra: e.target.value })}
                                                error={errors.quadra}
                                                required
                                            />
                                            <Input
                                                label="Lote"
                                                value={formData.lote}
                                                onChange={(e) => setFormData({ ...formData, lote: e.target.value })}
                                                error={errors.lote}
                                                required
                                            />
                                            <Input
                                                label="Número"
                                                value={formData.numeroLote}
                                                onChange={(e) => setFormData({ ...formData, numeroLote: e.target.value })}
                                                error={errors.numeroLote}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Proprietário e Inquilino */}
                        {formData.status !== 'disponivel' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Responsáveis
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Proprietário (Opcional)
                                        </label>
                                        <div className="flex space-x-2">
                                            <div className="flex-grow">
                                                <Select
                                                    options={proprietarios}
                                                    value={getProprietarioSelecionado()}
                                                    onChange={(option) => {
                                                        setFormData({ ...formData, proprietarioId: option?.value || '' });
                                                    }}
                                                    styles={selectStyles}
                                                    menuPortalTarget={document.body}
                                                    menuPosition="fixed"
                                                    placeholder="Selecione o proprietário"
                                                    isClearable
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setShowProprietarioForm(true)}
                                                className="px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
                                                title="Cadastrar novo proprietário"
                                            >
                                                <RiAddLine className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>


                                    {formData.status === 'alugado' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Inquilino
                                                <span className="text-danger-500 ml-1">*</span>
                                            </label>
                                            <div className="flex space-x-2">
                                                <div className="flex-grow">
                                                    <Select
                                                        options={inquilinos}
                                                        value={inquilinos.find(i => i.value === Number(formData.inquilinoId))}
                                                        onChange={(option) => setFormData({ ...formData, inquilinoId: option?.value || '' })}
                                                        styles={selectStyles}
                                                        menuPortalTarget={document.body}
                                                        menuPosition="fixed"
                                                        placeholder="Selecione o inquilino"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowInquilinoForm(true)}
                                                    className="px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-400 dark:hover:bg-primary-900/50"
                                                    title="Cadastrar novo inquilino"
                                                >
                                                    <RiAddLine className="w-5 h-5" />
                                                </button>
                                            </div>
                                            {errors.inquilinoId && (
                                                <p className="mt-1 text-sm text-danger-500">{errors.inquilinoId}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Documentos */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Documentos
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <RiUpload2Line className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Clique para upload</span> ou arraste e solte
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PDF, DOC, DOCX (MAX. 10MB)
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            multiple
                                            accept=".pdf,.doc,.docx"
                                        />
                                    </label>
                                </div>

                                {errors.documentos && (
                                    <p className="text-sm text-danger-500">{errors.documentos}</p>
                                )}

                                {formData.documentos.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        {formData.documentos.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {doc.nome}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {doc.tamanho}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(doc.id)}
                                                    className="text-danger-500 hover:text-danger-700"
                                                >
                                                    <RiCloseLine className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
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
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2.5 bg-primary-500 hover:bg-primary-700 text-white rounded-lg
                                transition-colors duration-200 font-medium"
                    >
                        {imovel ? 'Salvar' : 'Cadastrar'}
                    </button>
                </div>
            </div>

            {/* Modais de cadastro rápido */}
            <QuickUserForm
                isOpen={showProprietarioForm}
                onClose={() => setShowProprietarioForm(false)}
                onSuccess={(newOption) => {
                    setProprietarios([...proprietarios, newOption]);
                    setFormData({ ...formData, proprietarioId: newOption.value });
                }}
                defaultRole="proprietario"
            />

            <QuickUserForm
                isOpen={showInquilinoForm}
                onClose={() => setShowInquilinoForm(false)}
                onSuccess={(newOption) => {
                    setInquilinos([...inquilinos, newOption]);
                    setFormData({ ...formData, inquilinoId: newOption.value });
                }}
                defaultRole="inquilino"
            />
        </div>
    )
}