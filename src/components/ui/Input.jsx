import { forwardRef } from 'react'
import clsx from 'clsx'

const masks = {
	cpf: value => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})/, '$1-$2')
			.replace(/(-\d{2})\d+?$/, '$1')
	},
	phone: value => {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{5})(\d)/, '$1-$2')
			.replace(/(-\d{4})\d+?$/, '$1')
	},
	placa: value => {
		// Remove caracteres não alfanuméricos e converte para maiúsculo
		value = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
		
		// Se o comprimento for maior que 4 e o 4º caractere for uma letra,
		// assume formato Mercosul (ABC1D23)
		if (value.length > 4 && /[A-Z]/.test(value[4])) {
			return value
				.replace(/([A-Z]{3})(\d)([A-Z])(\d{2}).*/, '$1$2$3$4')
				.substring(0, 7)
		}
		
		// Caso contrário, assume formato antigo (ABC-1234)
		return value
			.replace(/([A-Z]{3})(\d{4}).*/, '$1-$2')
			.substring(0, 8)
	}
}

export const Input = forwardRef(({
	error,
	label,
	required,
	className,
	mask,
	onChange,
	value,
	multiline,
	rows = 3,
	...props
}, ref) => {
	const handleChange = (e) => {
		if (mask && masks[mask]) {
			e.target.value = masks[mask](e.target.value)
		}
		onChange?.(e)
	}

	const inputClasses = clsx(
		"w-full px-4 py-2 rounded-lg transition-colors duration-200",
		"border focus:outline-none focus:ring-2 focus:ring-offset-2",
		"disabled:opacity-50 disabled:cursor-not-allowed",
		error
			? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
			: "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500",
		"bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
		className
	)

	return (
		<div className="w-full">
			{label && (
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					{label}
					{required && <span className="text-danger-500 ml-1">*</span>}
				</label>
			)}
			<div>
				{multiline ? (
					<textarea
						ref={ref}
						className={inputClasses}
						value={value}
						onChange={handleChange}
						rows={rows}
						{...props}
					/>
				) : (
					<input
						ref={ref}
						className={inputClasses}
						value={value}
						onChange={handleChange}
						{...props}
					/>
				)}
			</div>
			{error && (
				<p className="mt-1 text-sm text-danger-500">{error}</p>
			)}
		</div>
	)
})

Input.displayName = 'Input'