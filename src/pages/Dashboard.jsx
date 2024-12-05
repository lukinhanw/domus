import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="pl-24 pr-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's what's happening in your condominium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Pending Approvals
            </h3>
            <p className="text-3xl font-bold text-primary-500">12</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Active Residents
            </h3>
            <p className="text-3xl font-bold text-primary-500">156</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Monthly Revenue
            </h3>
            <p className="text-3xl font-bold text-primary-500">$24,500</p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <p className="text-gray-900 dark:text-white">New maintenance request submitted</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}