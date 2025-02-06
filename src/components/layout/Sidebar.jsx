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
			className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-primary-800 to-primary-700 
                 border-r border-primary-600 z-50 flex flex-col transition-all duration-300
                 ${isExpanded ? 'w-64' : 'w-20'}`}
		>
			{/* Toggle Button */}
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="absolute -right-3 top-6 bg-primary-600 rounded-full p-1.5 text-white hover:bg-primary-500 transition-colors duration-200"
			>
				<RiMenuLine className="w-4 h-4" />
			</button>

			{/* Logo Section */}
			<div className="p-6 flex justify-center items-center">
				{isExpanded ? (
					<img
						src={logoFull}
						alt="Logo"
						className="h-8 w-auto"
					/>
				) : (
					<img
						src={logoSquare}
						alt="Logo"
						className="h-10 w-10 object-contain"
					/>
				)}
			</div>

			{/* Navigation Menu */}
			<nav className="flex-1 overflow-y-auto">
				{menuItems.map((item) => (
					<div
						key={item.path}
						className={`flex items-center px-6 py-3 cursor-pointer text-white/90 
                       hover:bg-white/10 transition-colors duration-200
                       ${location.pathname === item.path ? 'bg-white/10' : ''}`}
						onClick={() => navigate(item.path)}
					>
						<item.icon className="w-6 h-6 min-w-[24px]" />
						{isExpanded && (
							<span className="ml-3 whitespace-nowrap">
								{item.text}
							</span>
						)}
					</div>
				))}
			</nav>

			{/* Logout Button */}
			<div
				className="flex items-center px-6 py-3 cursor-pointer text-white/90 
                   hover:bg-white/10 transition-colors duration-200 mb-4"
				onClick={logout}
			>
				<RiLogoutBoxLine className="w-6 h-6 min-w-[24px]" />
				{isExpanded && (
					<span className="ml-3 whitespace-nowrap">
						Sair
					</span>
				)}
			</div>
		</div>
	)
}