import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { IoCheckmarkCircle, IoWarning, IoInformationCircle, IoCloseCircle } from 'react-icons/io5'

const toastVariants = {
	initial: { opacity: 0, x: 20, scale: 0.95 },
	animate: { opacity: 1, x: 0, scale: 1 },
	exit: { opacity: 0, x: 20, scale: 0.95 }
}

const getToastConfig = (type) => {
	const configs = {
		success: {
			icon: IoCheckmarkCircle,
			bgColor: 'bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-emerald-500/10',
			iconColor: 'text-emerald-500 dark:text-emerald-400',
			titleColor: 'text-emerald-800 dark:text-emerald-100',
			messageColor: 'text-emerald-600 dark:text-emerald-300',
			shadowColor: 'shadow-emerald-500/10'
		},
		error: {
			icon: IoCloseCircle,
			bgColor: 'bg-gradient-to-r from-red-500/10 to-red-500/5 dark:from-red-500/20 dark:to-red-500/10',
			iconColor: 'text-red-500 dark:text-red-400',
			titleColor: 'text-red-800 dark:text-red-100',
			messageColor: 'text-red-600 dark:text-red-300',
			shadowColor: 'shadow-red-500/10'
		},
		warning: {
			icon: IoWarning,
			bgColor: 'bg-gradient-to-r from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/10',
			iconColor: 'text-amber-500 dark:text-amber-400',
			titleColor: 'text-amber-800 dark:text-amber-100',
			messageColor: 'text-amber-600 dark:text-amber-300',
			shadowColor: 'shadow-amber-500/10'
		},
		info: {
			icon: IoInformationCircle,
			bgColor: 'bg-gradient-to-r from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/10',
			iconColor: 'text-blue-500 dark:text-blue-400',
			titleColor: 'text-blue-800 dark:text-blue-100',
			messageColor: 'text-blue-600 dark:text-blue-300',
			shadowColor: 'shadow-blue-500/10'
		}
	}
	return configs[type]
}

const CustomToast = ({ title, message, type }) => {
	const config = getToastConfig(type)
	const Icon = config.icon

	return (
		<motion.div
			variants={toastVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={`flex items-start p-4 rounded-xl ${config.bgColor} ${config.shadowColor} shadow-lg min-w-[320px] backdrop-blur-sm`}
		>
			<div className={`text-2xl mr-3 ${config.iconColor}`}>
				<Icon />
			</div>
			<div className="flex-1">
				<h4 className={`font-semibold mb-1 ${config.titleColor}`}>{title}</h4>
				<p className={`text-sm ${config.messageColor}`}>{message}</p>
			</div>
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				className={`ml-4 ${config.iconColor} hover:opacity-70 transition-opacity`}
				onClick={() => toast.dismiss()}
			>
				<IoCloseCircle className="text-lg" />
			</motion.button>
		</motion.div>
	)
}

export const showToast = {
	success: (title, message) => {
		toast.custom((t) => (
			<CustomToast title={title} message={message} type="success" />
		), {
			duration: 4000,
			position: 'top-right'
		})
	},
	error: (title, message) => {
		toast.custom((t) => (
			<CustomToast title={title} message={message} type="error" />
		), {
			duration: 5000,
			position: 'top-right'
		})
	},
	warning: (title, message) => {
		toast.custom((t) => (
			<CustomToast title={title} message={message} type="warning" />
		), {
			duration: 4500,
			position: 'top-right'
		})
	},
	info: (title, message) => {
		toast.custom((t) => (
			<CustomToast title={title} message={message} type="info" />
		), {
			duration: 4000,
			position: 'top-right'
		})
	}
}