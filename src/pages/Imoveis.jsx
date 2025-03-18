import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImovelFilters } from '../components/imoveis/ImovelFilters'
import { ImovelList } from '../components/imoveis/ImovelList'
import { getImoveis, deleteImovel } from '../services/imovelService'
import { RiLoader4Line } from 'react-icons/ri'
import { ConfirmModal } from '../components/common/ConfirmModal'
import { PageHeader } from '../components/ui/PageHeader'
import { RiHome2Line } from 'react-icons/ri'

export default function Imoveis({ setToast }) {
    const [imoveis, setImoveis] = useState([])
    const [loading, setLoading] = useState(true)
    const [imovelToDelete, setImovelToDelete] = useState(null)
    const navigate = useNavigate()

    const initialLoad = async () => {
        try {
            setLoading(true)
            const data = await getImoveis()
            setImoveis(data)
        } catch (error) {
            setToast({
                type: 'error',
                message: 'Não foi possível carregar a lista de imóveis'
            })
        } finally {
            setLoading(false)
        }
    }

    const reloadImoveis = async (filters = {}) => {
        try {
            setLoading(true)
            const data = await getImoveis(filters)
            setImoveis(data)
        } catch (error) {
            setToast({
                type: 'error',
                message: 'Não foi possível carregar a lista de imóveis'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (imovel) => {
        setImovelToDelete(imovel)
    }

    const confirmDelete = async () => {
        try {
            await deleteImovel(imovelToDelete.id)
            setToast({
                type: 'success',
                message: 'Imóvel excluído com sucesso'
            })
            await reloadImoveis()
        } catch (error) {
            setToast({
                type: 'error',
                message: 'Erro ao excluir imóvel'
            })
        } finally {
            setImovelToDelete(null)
        }
    }

    useEffect(() => {
        initialLoad()
    }, [])

    const handleFilterChange = (filters) => {
        reloadImoveis(filters)
    }

    return (
        <div>
            <div className="px-6 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Imóveis
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Gerencie os imóveis do condomínio
                            </p>
                        </div>
                    </div>

                    <ImovelFilters onFilterChange={handleFilterChange} />

                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                            <RiLoader4Line className="w-12 h-12 text-primary-500 animate-spin mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">Carregando imóveis...</p>
                        </div>
                    ) : imoveis.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Nenhum imóvel encontrado</p>
                        </div>
                    ) : (
                        <ImovelList
                            imoveis={imoveis}
                            onEdit={(imovel) => navigate(`/imoveis/${imovel.id}`)}
                            onDelete={handleDelete}
                        />
                    )}

                    <ConfirmModal
                        isOpen={!!imovelToDelete}
                        onClose={() => setImovelToDelete(null)}
                        onConfirm={confirmDelete}
                        title="Confirmar exclusão"
                        message={`Tem certeza que deseja excluir o imóvel ${imovelToDelete?.titulo}? Esta ação não pode ser desfeita.`}
                    />
                </div>
            </div>
        </div>
    )
}