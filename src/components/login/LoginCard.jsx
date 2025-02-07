import { motion } from 'framer-motion'
import logoFull from '../../assets/images/logo-full.png'
import logoDark from '../../assets/images/logo-square-dark.png'

export function LoginCard({ children }) {
	return (
		<div className="w-full max-w-md mx-auto">
			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
				<div className="px-8 pt-8 pb-6">
					<motion.div
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="flex justify-center"
					>
						<img
							src={logoDark}
							alt="Logo"
							className="h-24 w-auto"
						/>
					</motion.div>
				</div>
				<div className="px-8 pb-8">
					{children}
				</div>
			</div>
		</div>
	)
}