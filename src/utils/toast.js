import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const toastVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

const CustomToast = ({ title, message, type }) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 min-w-[300px]"
      style={{
        borderLeftColor: type === 'error' ? '#d32f2f' : 
                        type === 'success' ? '#2e7d32' :
                        type === 'warning' ? '#f57c00' : '#0288d1'
      }}
    >
      <span className="text-xl mr-3">{icons[type]}</span>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </motion.div>
  )
}

export const showToast = {
  success: (title, message) => {
    toast.custom((t) => (
      <CustomToast title={title} message={message} type="success" />
    ))
  },
  error: (title, message) => {
    toast.custom((t) => (
      <CustomToast title={title} message={message} type="error" />
    ))
  },
  warning: (title, message) => {
    toast.custom((t) => (
      <CustomToast title={title} message={message} type="warning" />
    ))
  },
  info: (title, message) => {
    toast.custom((t) => (
      <CustomToast title={title} message={message} type="info" />
    ))
  }
}