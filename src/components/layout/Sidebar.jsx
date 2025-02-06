import { RiDashboardLine, RiUser3Line, RiSettings4Line, RiLogoutBoxLine, RiTeamLine, RiMenuLine } from 'react-icons/ri'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useSidebar } from '../../App'
import logoFull from '../../assets/images/logo-full.png'
import logoSquare from '../../assets/images/logo-square-dark.png'

const menuItems = [
	{ icon: RiDashboardLine, text: 'Dashboard', path: '/dashboard' },
	{ icon: RiTeamLine, text: 'Usuários', path: '/users' },
	{ icon: RiUser3Line, text: 'Perfil', path: '/profile' },
	{ icon: RiSettings4Line, text: 'Configurações', path: '/settings' }
]

export default function Sidebar() {
	const { isExpanded, setIsExpanded } = useSidebar()
	const navigate = useNavigate()
	const location = useLocation()
	const { logout } = useAuth()

	return (
		<div
			className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
                 border-r border-gray-800 z-50 flex flex-col transition-all duration-300
                 ${isExpanded ? 'w-64' : 'w-20'}`}
		>
			{/* Toggle Button */}
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="absolute -right-3 top-6 bg-gray-700 rounded-full p-1.5 text-white hover:bg-gray-600 transition-colors duration-200"
			>
				<RiMenuLine className="w-4 h-4" />
			</button>

			{/* Logo Section */}
			<div className="p-6 flex justify-center items-center">
				{isExpanded ? (
					<img
						src={logoFull}
						alt="Logo"
						className="h-8 w-auto brightness-200"
					/>
				) : (
					<img
						src={logoSquare}
						alt="Logo"
						className="h-10 w-10 object-contain brightness-200"
					/>
				)}
			</div>

			{/* Navigation Menu */}
			<nav className="flex-1 overflow-y-auto px-3">
				{menuItems.map((item) => (
					<div
						key={item.path}
						className={`flex items-center px-4 py-3 cursor-pointer text-gray-300 
                       hover:bg-gray-700/50 rounded-lg mb-1 transition-colors duration-200
                       ${location.pathname === item.path ? 'bg-gray-700/50 text-white' : ''}`}
						onClick={() => navigate(item.path)}
					>
						<item.icon className="w-5 h-5 min-w-[20px]" />
						{isExpanded && (
							<span className="ml-3 whitespace-nowrap text-sm">
								{item.text}
							</span>
						)}
					</div>
				))}
			</nav>

			{/* Logout Button */}
			<div
				className="flex items-center px-4 py-3 cursor-pointer text-gray-300 mx-3 mb-4
                   hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
				onClick={logout}
			>
				<RiLogoutBoxLine className="w-5 h-5 min-w-[20px]" />
				{isExpanded && (
					<span className="ml-3 whitespace-nowrap text-sm">
						Sair
					</span>
				)}
			</div>
		</div>
	)
}