import { motion } from 'framer-motion'
import { RiDashboardLine, RiUser3Line, RiSettings4Line, RiLogoutBoxLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const menuItems = [
  { icon: RiDashboardLine, text: 'Dashboard', path: '/dashboard' },
  { icon: RiUser3Line, text: 'Profile', path: '/profile' },
  { icon: RiSettings4Line, text: 'Settings', path: '/settings' }
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="sidebar-container group hover:w-64"
    >
      <div className="py-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 mx-auto bg-primary-500 rounded-lg flex items-center justify-center"
        >
          <span className="text-white text-xl font-bold">CM</span>
        </motion.div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <motion.div
            key={item.path}
            whileHover={{ x: 10 }}
            className="nav-item"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="w-6 h-6" />
            <span className="nav-text opacity-0 group-hover:opacity-100">{item.text}</span>
          </motion.div>
        ))}
        
        <motion.div
          whileHover={{ x: 10 }}
          className="nav-item mt-auto"
          onClick={logout}
        >
          <RiLogoutBoxLine className="w-6 h-6" />
          <span className="nav-text opacity-0 group-hover:opacity-100">Logout</span>
        </motion.div>
      </nav>
    </motion.div>
  )
}