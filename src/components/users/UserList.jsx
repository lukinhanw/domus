import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RiEditLine, RiDeleteBinLine, RiCheckboxCircleFill, RiCloseCircleFill, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { Tooltip } from '../ui/Tooltip'
import { useState, useEffect } from 'react'

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]

const roleLabels = {
	admin: 'Administrador',
	sindico: 'Síndico',
	funcionario: 'Funcionário',
	proprietario: 'Proprietário',
	inquilino: 'Inquilino'
}

const roleStyles = {
	admin: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
	sindico: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
	funcionario: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
	proprietario: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
	inquilino: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
}

export function UserList({ users, onEdit, onDelete }) {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const totalPages = Math.ceil(users.length / pageSize)
	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize
	const currentUsers = users.slice(startIndex, endIndex)

	// Reset para primeira página quando mudar o tamanho da página
	useEffect(() => {
		setCurrentPage(1)
	}, [pageSize])

	const handlePreviousPage = () => {
		setCurrentPage(prev => Math.max(prev - 1, 1))
	}

	const handleNextPage = () => {
		setCurrentPage(prev => Math.min(prev + 1, totalPages))
	}

	return (
		<div className="flex flex-col h-[calc(100vh-27rem)]">
			<div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
				<div className="overflow-auto h-full">
					<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
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
									Data de Cadastro
								</th>
								<th className="px-8 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-200 tracking-wider">
									Ações
								</th>
							</tr>
						</thead>
						<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
							{currentUsers.map((user) => (
								<tr
									key={user.id}
									className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
								>
									<td className="px-8 py-5 whitespace-nowrap">
										<div className="flex items-center space-x-2">
											<Tooltip content={user.status ? 'Usuário Ativo' : 'Usuário Inativo'}>
												{user.status ? (
													<RiCheckboxCircleFill className="w-5 h-5 text-green-500" />
												) : (
													<RiCloseCircleFill className="w-5 h-5 text-red-500" />
												)}
											</Tooltip>
											<div className="text-base font-medium text-gray-900 dark:text-white">
												{user.name}
											</div>
										</div>
									</td>
									<td className="px-8 py-5 whitespace-nowrap">
										<div className="text-sm text-gray-600 dark:text-gray-300">
											{user.cpf}
										</div>
									</td>
									<td className="px-8 py-5 whitespace-nowrap">
										<div className="text-sm text-gray-600 dark:text-gray-300">
											<span className={`px-3 py-1 inline-flex text-sm font-medium rounded-full ${roleStyles[user.role]}`}>
												{roleLabels[user.role]}
											</span>
										</div>
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

			{/* Paginação */}
			<div className="mt-4 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
				<div className="flex items-center space-x-4">
					<span className="text-sm text-gray-700 dark:text-gray-300">
						Mostrando <span className="font-medium">{startIndex + 1}</span> até{' '}
						<span className="font-medium">{Math.min(endIndex, users.length)}</span> de{' '}
						<span className="font-medium">{users.length}</span> resultados
					</span>

					<div className="flex items-center space-x-2">
						<label htmlFor="pageSize" className="text-sm text-gray-600 dark:text-gray-400">
							Itens por página:
						</label>
						<select
							id="pageSize"
							value={pageSize}
							onChange={(e) => setPageSize(Number(e.target.value))}
							className="block w-24 rounded-lg border border-gray-300 dark:border-gray-600 
								bg-white dark:bg-gray-700 
								text-gray-700 dark:text-gray-300 
								text-sm font-medium
								focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:focus:border-primary-500
								transition-all duration-200
								py-1.5 pl-3"
						>
							{PAGE_SIZE_OPTIONS.map(size => (
								<option key={size} value={size} className="py-2">
									{size} itens
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="flex items-center space-x-2">
					<button
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
						className={`p-2 rounded-lg transition-colors duration-200 ${
							currentPage === 1
								? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
								: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
						}`}
					>
						<RiArrowLeftSLine className="w-5 h-5" />
					</button>
					<span className="text-sm text-gray-700 dark:text-gray-300">
						Página <span className="font-medium">{currentPage}</span> de{' '}
						<span className="font-medium">{totalPages}</span>
					</span>
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						className={`p-2 rounded-lg transition-colors duration-200 ${
							currentPage === totalPages
								? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
								: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
						}`}
					>
						<RiArrowRightSLine className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	)
}