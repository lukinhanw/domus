import { RiNotification3Line, RiLogoutBoxLine } from 'react-icons/ri'
import { useAuth } from '../../contexts/AuthContext'

const roleLabels = {
    admin: 'Administrador',
    sindico: 'Síndico',
    funcionario: 'Funcionário',
    proprietario: 'Proprietário',
    inquilino: 'Inquilino'
}

export function MainHeader({ actions }) {
    const { user, logout } = useAuth()

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border border-gray-800 rounded-2xl shadow-xl px-6 py-3 flex items-center space-x-6">
                
                {/* Botões de Ação */}
                {actions?.length > 0 && (
                    <>
                        <div className="flex items-center space-x-2">
                            {actions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.onClick}
                                    className="btn-primary text-sm"
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                        <div className="w-px h-8 bg-gray-700" />
                    </>
                )}
                
                {/* Notificações */}
                <button className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <RiNotification3Line className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs flex items-center justify-center rounded-full">3</span>
                </button>

                {/* Separador */}
                <div className="w-px h-8 bg-gray-700" />

                {/* Usuário */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-lg font-medium text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="text-sm">
                        <p className="text-white font-medium">{user?.name}</p>
                        <p className="text-gray-400">{user?.email}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{roleLabels[user?.role] || 'Usuário'}</p>
                    </div>
                </div>

                {/* Separador */}
                <div className="w-px h-8 bg-gray-700" />

                {/* Botão de Sair */}
                <button 
                    onClick={logout}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                    <RiLogoutBoxLine className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
} 