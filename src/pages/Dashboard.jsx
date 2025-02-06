import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
	const { user } = useAuth()

	return (
		<div className="p-4 pr-4 py-8">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Bem vindo de volta, {user?.name}
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">
						Veja o que está acontecendo no seu condomínio
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Quick Stats */}
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							Aprovações pendentes
						</h3>
						<p className="text-3xl font-bold text-primary-500">12</p>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							Residentes Ativos
						</h3>
						<p className="text-3xl font-bold text-primary-500">156</p>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							Receita Mensal
						</h3>
						<p className="text-3xl font-bold text-primary-500">$24,500</p>
					</div>
				</div>

				{/* Recent Activity */}
				<div className="mt-8">
					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
						Atividade recente
					</h2>
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
						<div className="divide-y divide-gray-200 dark:divide-gray-700">
							{[1, 2, 3].map((item) => (
								<div key={item} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
									<p className="text-gray-900 dark:text-white">Nova solicitação de manutenção enviada</p>
									<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2 horas atrás</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}