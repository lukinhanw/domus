import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RiEditLine, RiDeleteBinLine, RiArrowLeftSLine, RiArrowRightSLine, RiUserLine, RiCloseLine, RiLoader4Line } from 'react-icons/ri'
import { Tooltip } from '../ui/Tooltip'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { getUser } from '../../services/userService'
import { motion, AnimatePresence } from 'framer-motion'

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

const tipoLabels = {
    apartamento: 'Apartamento',
    casa: 'Casa'
}

const statusStyles = {
    disponivel: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    vendido: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    alugado: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    embargado: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
}

const statusLabels = {
    disponivel: 'Desocupado',
    vendido: 'Ocupado',
    alugado: 'Alugado',
    embargado: 'Embargado'
}

const roleLabels = {
    proprietario: 'Proprietário',
    inquilino: 'Inquilino'
}

// Componente separado para o modal de usuário
const UserModal = ({ isOpen, onClose, userId, role }) => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            if (isOpen && userId) {
                setLoading(true)
                try {
                    const data = await getUser(userId)
                    setUserData(data)
                } catch (error) {
                    console.error(`Erro ao carregar dados do ${role}:`, error)
                } finally {
                    setLoading(false)
                }
            }
        }
        
        loadUser()
    }, [isOpen, userId, role])

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div 
                className="fixed inset-0 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div 
                    className="fixed inset-0 bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ 
                        type: "spring", 
                        damping: 30, 
                        stiffness: 400, 
                        duration: 0.15 
                    }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md relative z-10"
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <RiLoader4Line className="w-10 h-10 text-primary-500 animate-spin mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">Carregando informações...</p>
                        </div>
                    ) : userData ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {roleLabels[role]}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <RiCloseLine className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Nome</p>
                                    <p className="text-base text-gray-900 dark:text-white">{userData.name}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">CPF</p>
                                    <p className="text-base text-gray-900 dark:text-white">{userData.cpf}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Telefone</p>
                                    <p className="text-base text-gray-900 dark:text-white">{userData.phone || 'Não informado'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${userData.status ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                        {userData.status ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
                                    text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200"
                                >
                                    Fechar
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                            <p className="text-gray-600 dark:text-gray-400">Usuário não encontrado</p>
                            <button
                                onClick={onClose}
                                className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 
                                text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200"
                            >
                                Fechar
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export function ImovelList({ imoveis, onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [modalInfo, setModalInfo] = useState({ isOpen: false, userId: null, role: '' })
    
    // Cache otimizado usando lazy loading
    const [usersCache, setUsersCache] = useState({})
    const [isLoadingUsers, setIsLoadingUsers] = useState(true)
    
    const totalPages = Math.ceil(imoveis.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentImoveis = useMemo(() => imoveis.slice(startIndex, endIndex), [imoveis, startIndex, endIndex])

    // Reset da paginação quando o tamanho da página muda
    useEffect(() => {
        setCurrentPage(1)
    }, [pageSize])

    // Carregar nomes de proprietários e inquilinos apenas para os itens visíveis na página atual
    useEffect(() => {
        const carregarUsuariosVisiveis = async () => {
            setIsLoadingUsers(true)
            const usuariosParaCarregar = new Set()
            
            for (const imovel of currentImoveis) {
                if (imovel.proprietarioId && !usersCache[imovel.proprietarioId]) {
                    usuariosParaCarregar.add(imovel.proprietarioId)
                }
                
                if (imovel.inquilinoId && !usersCache[imovel.inquilinoId]) {
                    usuariosParaCarregar.add(imovel.inquilinoId)
                }
            }
            
            if (usuariosParaCarregar.size === 0) {
                setIsLoadingUsers(false)
                return
            }
            
            try {
                const promises = Array.from(usuariosParaCarregar).map(async (userId) => {
                    try {
                        const userData = await getUser(userId)
                        return { userId, userData }
                    } catch (error) {
                        console.error('Erro ao carregar usuário:', error)
                        return { userId, userData: null }
                    }
                })
                
                const resultados = await Promise.all(promises)
                
                const novosUsuarios = {}
                resultados.forEach(({ userId, userData }) => {
                    if (userData) {
                        novosUsuarios[userId] = userData
                    }
                })
                
                setUsersCache(prev => ({ ...prev, ...novosUsuarios }))
            } catch (error) {
                console.error('Erro ao carregar usuários:', error)
            } finally {
                setIsLoadingUsers(false)
            }
        }
        
        carregarUsuariosVisiveis()
    }, [currentImoveis])

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    // Função para obter a identificação do imóvel com base no tipo
    const getImovelIdentificacao = (imovel) => {
        if (imovel.tipo === 'apartamento') {
            return `Bloco / Quadra ${imovel.bloco} - Apto ${imovel.apartamento}`;
        } else {
            return `Bloco / Quadra ${imovel.quadra} - Lote ${imovel.lote}`;
        }
    }

    // Função para obter informações adicionais do imóvel com base no tipo
    const getImovelDetalhes = (imovel) => {
        if (imovel.tipo === 'apartamento') {
            return `Andar: ${imovel.andar}`;
        } else {
            return `Número: ${imovel.numeroLote || 'Não informado'}`;
        }
    }

    const showUserModal = useCallback((userId, role) => {
        setModalInfo({ isOpen: true, userId, role })
    }, [])

    const closeUserModal = useCallback(() => {
        setModalInfo({ isOpen: false, userId: null, role: '' })
    }, [])

    return (
        <div className="flex flex-col h-[calc(100vh-27rem)]">
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-auto h-full">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
                            <tr>
                                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
                                    Identificação
                                </th>
                                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
                                    Vagas
                                </th>
                                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
                                    Status
                                </th>
                                <th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
                                    Responsável
                                </th>
                                <th className="px-8 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                            {currentImoveis.map((imovel) => (
                                <tr
                                    key={imovel.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                                >
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="text-base font-medium text-gray-900 dark:text-white">
                                            {getImovelIdentificacao(imovel)}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {getImovelDetalhes(imovel)}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                            {tipoLabels[imovel.tipo]}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                            {imovel.vagas} {parseInt(imovel.vagas) > 1 ? 'vagas' : 'vaga'}
                                        </div>
                                        {imovel.vagasInfo && imovel.vagasInfo.length > 0 && (
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {imovel.vagasInfo.map(vaga => vaga.numero).join(', ')}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-sm font-medium rounded-full ${statusStyles[imovel.status]}`}>
                                            {statusLabels[imovel.status]}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        {isLoadingUsers ? (
                                            <div className="flex items-center space-x-2">
                                                <RiLoader4Line className="w-4 h-4 text-primary-500 animate-spin" />
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Carregando...</span>
                                            </div>
                                        ) : imovel.inquilinoId && usersCache[imovel.inquilinoId] ? (
                                            <div>
                                                <div 
                                                    className="text-sm font-medium text-amber-600 dark:text-amber-400 cursor-pointer hover:underline"
                                                    onClick={() => showUserModal(imovel.inquilinoId, 'inquilino')}
                                                >
                                                    {usersCache[imovel.inquilinoId].name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {roleLabels.inquilino}
                                                </div>
                                            </div>
                                        ) : imovel.proprietarioId && usersCache[imovel.proprietarioId] ? (
                                            <div>
                                                <div 
                                                    className="text-sm font-medium text-green-600 dark:text-green-400 cursor-pointer hover:underline"
                                                    onClick={() => showUserModal(imovel.proprietarioId, 'proprietario')}
                                                >
                                                    {usersCache[imovel.proprietarioId].name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {roleLabels.proprietario}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {(imovel.proprietarioId || imovel.inquilinoId) ? "Não encontrado" : "Não informado"}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-3">
                                            <Tooltip content="Editar imóvel" position="left">
                                                <button
                                                    onClick={() => onEdit(imovel)}
                                                    className="p-2 rounded-lg text-blue-600 hover:text-blue-800 
                                                    hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-blue-400 dark:hover:text-blue-300
                                                    transition-colors duration-200"
                                                >
                                                    <RiEditLine className="w-5 h-5" />
                                                </button>
                                            </Tooltip>
                                            <Tooltip content="Excluir imóvel" position="left">
                                                <button
                                                    onClick={() => onDelete(imovel)}
                                                    className="p-2 rounded-lg text-red-600 hover:text-red-800
                                                    hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300
                                                    transition-colors duration-200"
                                                >
                                                    <RiDeleteBinLine className="w-5 h-5" />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Paginação */}
            <div className="mt-4 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Mostrando <span className="font-medium">{startIndex + 1}</span> até{' '}
                        <span className="font-medium">{Math.min(endIndex, imoveis.length)}</span> de{' '}
                        <span className="font-medium">{imoveis.length}</span> resultados
                    </span>

                    <div className="flex items-center space-x-2">
                        <label htmlFor="pageSize" className="text-sm text-gray-600 dark:text-gray-400">
                            Itens por página:
                        </label>
                        <select
                            id="pageSize"
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="block w-24 rounded-lg border border-gray-300 dark:border-gray-600 
                                bg-white dark:bg-gray-700 
                                text-gray-700 dark:text-gray-300 
                                text-sm font-medium
                                focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:focus:border-primary-500
                                transition-all duration-200
                                py-1.5 pl-3"
                        >
                            {PAGE_SIZE_OPTIONS.map(size => (
                                <option key={size} value={size} className="py-2">
                                    {size} itens
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                            currentPage === 1
                                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        <RiArrowLeftSLine className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Página <span className="font-medium">{currentPage}</span> de{' '}
                        <span className="font-medium">{totalPages}</span>
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                            currentPage === totalPages
                                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        <RiArrowRightSLine className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Modal de usuário compartilhado */}
            <UserModal 
                isOpen={modalInfo.isOpen} 
                onClose={closeUserModal} 
                userId={modalInfo.userId} 
                role={modalInfo.role} 
            />
        </div>
    )
}