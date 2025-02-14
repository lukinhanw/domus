import { motion } from 'framer-motion'
import logoFull from '../../assets/images/logo-full.png'
import logoDark from '../../assets/images/logo-square-dark.png'

export function LoginCard({ children }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="w-full"
		>
			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
				<div className="px-8 pt-8 pb-6">
					<motion.div
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex flex-col items-center space-y-4"
					>
						<img
							src={logoDark}
							alt="Logo"
							className="h-20 w-auto"
						/>
						<h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
							Acesse sua conta
						</h2>
						<p className="text-gray-500 dark:text-gray-400 text-center">
							Digite suas credenciais para acessar o sistema
						</p>
					</motion.div>
				</div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="px-8 pb-8"
				>
					{children}
				</motion.div>
			</div>
		</motion.div>
	)
}