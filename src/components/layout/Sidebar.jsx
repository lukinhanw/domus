import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiDashboardLine, RiUser3Line, RiSettings4Line, RiLogoutBoxLine, RiTeamLine, RiMenuLine } from 'react-icons/ri'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import logoFull from '../../assets/images/logo-full.png'
import logoSquare from '../../assets/images/logo-square-dark.png'

const menuItems = [
  { icon: RiDashboardLine, text: 'Dashboard', path: '/dashboard' },
  { icon: RiTeamLine, text: 'Usuários', path: '/users' },
  { icon: RiUser3Line, text: 'Perfil', path: '/profile' },
  { icon: RiSettings4Line, text: 'Configurações', path: '/settings' }
]

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 256 : 80 }}
      className="fixed top-0 left-0 h-screen bg-gradient-to-b from-primary-800 to-primary-700 
                 border-r border-primary-600 z-50 flex flex-col"
      transition={{ duration: 0.3 }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 bg-primary-600 rounded-full p-1.5 text-white 
                   hover:bg-primary-500 transition-colors duration-200"
      >
        <RiMenuLine className="w-4 h-4" />
      </button>

      {/* Logo Section */}
      <div className="p-6 flex justify-center items-center">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.img
              key="full-logo"
              src={logoFull}
              alt="Logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="h-8 w-auto"
            />
          ) : (
            <motion.img
              key="square-logo"
              src={logoSquare}
              alt="Logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="h-10 w-10 object-contain"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <motion.div
            key={item.path}
            className={`flex items-center px-6 py-3 cursor-pointer text-white/90 
                       hover:bg-white/10 transition-colors duration-200
                       ${location.pathname === item.path ? 'bg-white/10' : ''}`}
            onClick={() => navigate(item.path)}
            whileHover={{ x: 5 }}
          >
            <item.icon className="w-6 h-6 min-w-[24px]" />
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-3 whitespace-nowrap"
                >
                  {item.text}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </nav>

      {/* Logout Button */}
      <motion.div
        className="flex items-center px-6 py-3 cursor-pointer text-white/90 
                   hover:bg-white/10 transition-colors duration-200 mb-4"
        onClick={logout}
        whileHover={{ x: 5 }}
      >
        <RiLogoutBoxLine className="w-6 h-6 min-w-[24px]" />
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="ml-3 whitespace-nowrap"
            >
              Sair
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}