import { forwardRef } from 'react'
import clsx from 'clsx'

export const Input = forwardRef(({
	error,
	label,
	required,
	className,
	...props
}, ref) => {
	return (
		<div className="w-full">
			{label && (
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					{label}
					{required && <span className="text-danger-500 ml-1">*</span>}
				</label>
			)}
			<div>
				<input
					ref={ref}
					className={clsx(
						"w-full px-4 py-2 rounded-lg transition-colors duration-200",
						"border focus:outline-none focus:ring-2 focus:ring-offset-2",
						"disabled:opacity-50 disabled:cursor-not-allowed",
						error
							? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
							: "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500",
						"bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
						className
					)}
					{...props}
				/>
			</div>
			{error && (
				<p className="mt-1 text-sm text-danger-500">{error}</p>
			)}
		</div>
	)
})

Input.displayName = 'Input'