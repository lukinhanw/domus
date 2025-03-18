import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ImovelForm as Form } from '../components/imoveis/ImovelEditForm'
import { createImovel, updateImovel, getImovel } from '../services/imovelService'

export default function ImovelForm({ setToast }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [imovel, setImovel] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadImovel = async () => {
            if (id) {
                try {
                    setLoading(true)
                    const imovelData = await getImovel(parseInt(id))
                    
                    // Converter IDs para números explicitamente
                    if (imovelData.proprietarioId) {
                        imovelData.proprietarioId = Number(imovelData.proprietarioId);
                    }
                    if (imovelData.inquilinoId) {
                        imovelData.inquilinoId = Number(imovelData.inquilinoId);
                    }
                    
                    setImovel(imovelData)
                } catch (error) {
                    setToast({
                        type: 'error',
                        message: 'Não foi possível carregar os dados do imóvel'
                    })
                    navigate('/imoveis')
                } finally {
                    setLoading(false)
                }
            }
        }

        loadImovel()
    }, [id, navigate, setToast])

    const handleSubmit = async (formData) => {
        try {
            setLoading(true)
            if (id) {
                await updateImovel(parseInt(id), formData)
                setToast({
                    type: 'success',
                    message: 'Imóvel atualizado com sucesso'
                })
            } else {
                await createImovel(formData)
                setToast({
                    type: 'success',
                    message: 'Imóvel criado com sucesso'
                })
            }
            navigate('/imoveis')
        } catch (error) {
            setToast({
                type: 'error',
                message: error.message || 'Erro ao salvar imóvel'
            })
        } finally {
            setLoading(false)
        }
    }

    if (loading && id) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        )
    }

    return (
        <Form
            imovel={imovel}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/imoveis')}
            loading={loading}
        />
    )
}