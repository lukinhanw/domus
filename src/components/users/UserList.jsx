import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri'
import { Tooltip } from '../ui/Tooltip'

const roleLabels = {
	admin: 'Administrador',
	sindico: 'Síndico',
	funcionario: 'Funcionário',
	proprietario: 'Proprietário'
}

export function UserList({ users, onEdit, onDelete }) {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead className="bg-gray-50 dark:bg-gray-700">
						<tr>
							<th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
								Nome
							</th>
							<th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
								CPF
							</th>
							<th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
								Cargo
							</th>
							<th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
								Status
							</th>
							<th className="px-8 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
								Data de Cadastro
							</th>
							<th className="px-8 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
								Ações
							</th>
						</tr>
					</thead>
					<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
						{users.map((user) => (
							<tr
								key={user.id}
								className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
							>
								<td className="px-8 py-5 whitespace-nowrap">
									<div className="text-base font-medium text-gray-900 dark:text-white">
										{user.name}
									</div>
								</td>
								<td className="px-8 py-5 whitespace-nowrap">
									<div className="text-sm text-gray-600 dark:text-gray-300">
										{user.cpf}
									</div>
								</td>
								<td className="px-8 py-5 whitespace-nowrap">
									<div className="text-sm text-gray-600 dark:text-gray-300">
										{roleLabels[user.role]}
									</div>
								</td>
								<td className="px-8 py-5 whitespace-nowrap">
									<span className={`px-3 py-1 inline-flex text-sm font-medium rounded-full ${user.status
											? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
											: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
										}`}>
										{user.status ? 'Ativo' : 'Inativo'}
									</span>
								</td>
								<td className="px-8 py-5 whitespace-nowrap">
									<div className="text-sm text-gray-600 dark:text-gray-300">
										{format(new Date(user.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
									</div>
								</td>
								<td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
									<div className="flex items-center justify-end space-x-3">
										<Tooltip content="Editar usuário" position="left">
											<button
												onClick={() => onEdit(user)}
												className="p-2 rounded-lg text-blue-600 hover:text-blue-800 
                                 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-blue-400 dark:hover:text-blue-300
                                 transition-colors duration-200"
											>
												<RiEditLine className="w-5 h-5" />
											</button>
										</Tooltip>
										<Tooltip content="Excluir usuário" position="left">
											<button
												onClick={() => onDelete(user)}
												className="p-2 rounded-lg text-red-600 hover:text-red-800
                                 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300
                                 transition-colors duration-200"
											>
												<RiDeleteBinLine className="w-5 h-5" />
											</button>
										</Tooltip>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}