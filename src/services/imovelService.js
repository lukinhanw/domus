const MOCK_IMOVEIS = [
    {
        id: 1,
        tipo: 'apartamento',
        descricao: 'Apartamento com vista para o jardim central do condomínio',
        vagas: 2,
        vagasInfo: [
            { id: 1, numero: 'A-15' },
            { id: 2, numero: 'A-16' }
        ],
        status: 'disponivel',
        documentos: [
            {
                id: 1,
                nome: 'Escritura.pdf',
                tipo: 'application/pdf',
                tamanho: '2.5MB',
                dataUpload: '2024-03-15T10:00:00'
            }
        ],
        bloco: 'A',
        apartamento: '101',
        andar: 1,
        createdAt: '2024-03-15T10:00:00'
    },
    {
        id: 2,
        tipo: 'casa',
        descricao: 'Casa com acabamento de alto padrão e amplo quintal',
        vagas: 3,
        vagasInfo: [
            { id: 3, numero: 'G-22' },
            { id: 4, numero: 'G-23' },
            { id: 5, numero: 'G-24' }
        ],
        status: 'vendido',
        proprietarioId: 4,
        documentos: [
            {
                id: 2,
                nome: 'Contrato.pdf',
                tipo: 'application/pdf',
                tamanho: '1.8MB',
                dataUpload: '2024-03-14T14:30:00'
            }
        ],
        quadra: 'C',
        lote: '15',
        numeroLote: '37',
        createdAt: '2024-03-14T14:30:00'
    },
    {
        id: 3,
        tipo: 'apartamento',
        descricao: 'Apartamento próximo à área de lazer, reformado recentemente',
        vagas: 1,
        vagasInfo: [
            { id: 6, numero: 'B-08' }
        ],
        status: 'alugado',
        proprietarioId: 3,
        inquilinoId: 12,
        documentos: [
            {
                id: 3,
                nome: 'Contrato_Locacao.pdf',
                tipo: 'application/pdf',
                tamanho: '3.2MB',
                dataUpload: '2024-02-20T09:15:00'
            }
        ],
        bloco: 'B',
        apartamento: '302',
        andar: 3,
        createdAt: '2024-02-20T09:15:00'
    },
    {
        id: 4,
        tipo: 'casa',
        descricao: 'Casa térrea com amplo jardim, recém construída',
        vagas: 2,
        vagasInfo: [
            { id: 7, numero: 'G-45' },
            { id: 8, numero: 'G-46' }
        ],
        status: 'embargado',
        proprietarioId: 8,
        documentos: [
            {
                id: 4,
                nome: 'Notificacao_embargo.pdf',
                tipo: 'application/pdf',
                tamanho: '1.5MB',
                dataUpload: '2024-01-10T11:20:00'
            }
        ],
        quadra: 'D',
        lote: '07',
        numeroLote: '42',
        createdAt: '2024-01-10T11:20:00'
    }
]

export const getImoveis = async (filters = {}) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredImoveis = [...MOCK_IMOVEIS]

            if (filters.search) {
                const searchTerm = filters.search.toLowerCase()
                filteredImoveis = filteredImoveis.filter(imovel =>
                    imovel.descricao.toLowerCase().includes(searchTerm) ||
                    (imovel.tipo === 'apartamento' && 
                        `${imovel.bloco}-${imovel.apartamento}`.toLowerCase().includes(searchTerm)) ||
                    (imovel.tipo === 'casa' && 
                        `${imovel.quadra}-${imovel.lote}`.toLowerCase().includes(searchTerm))
                )
            }

            if (filters.tipo) {
                filteredImoveis = filteredImoveis.filter(imovel => imovel.tipo === filters.tipo)
            }

            if (filters.status) {
                filteredImoveis = filteredImoveis.filter(imovel => imovel.status === filters.status)
            }

            resolve(filteredImoveis)
        }, 500)
    })
}

export const getImovel = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const imovel = MOCK_IMOVEIS.find(imovel => imovel.id === id)
            if (!imovel) {
                reject(new Error('Imóvel não encontrado'))
                return
            }
            resolve(imovel)
        }, 500)
    })
}

export const createImovel = async (imovelData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newImovel = {
                id: MOCK_IMOVEIS.length + 1,
                ...imovelData,
                createdAt: new Date().toISOString()
            }
            MOCK_IMOVEIS.push(newImovel)
            resolve(newImovel)
        }, 500)
    })
}

export const updateImovel = async (id, imovelData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const imovelIndex = MOCK_IMOVEIS.findIndex(imovel => imovel.id === id)
            if (imovelIndex === -1) {
                reject(new Error('Imóvel não encontrado'))
                return
            }
            MOCK_IMOVEIS[imovelIndex] = { ...MOCK_IMOVEIS[imovelIndex], ...imovelData }
            resolve(MOCK_IMOVEIS[imovelIndex])
        }, 500)
    })
}

export const deleteImovel = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const imovelIndex = MOCK_IMOVEIS.findIndex(imovel => imovel.id === id)
            if (imovelIndex === -1) {
                reject(new Error('Imóvel não encontrado'))
                return
            }
            MOCK_IMOVEIS.splice(imovelIndex, 1)
            resolve(true)
        }, 500)
    })
}