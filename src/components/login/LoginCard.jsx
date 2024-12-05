import { motion } from 'framer-motion'

export function LoginCard({ children }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full max-w-md"
		>
			<motion.div
				className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30"
				whileHover={{
					boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
					transform: "translateY(-4px)"
				}}
				transition={{ duration: 0.3 }}
			>
				<div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50 rounded-2xl" />
				<div className="relative">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-center mb-8"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 200, damping: 15 }}
							className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center"
						>
							<span className="text-2xl font-bold text-white">CM</span>
						</motion.div>
						<h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
							Bem vindo de volta
						</h2>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
							Faça login na sua conta
						</p>
					</motion.div>

					{children}
				</div>
			</motion.div>
		</motion.div>
	)
}