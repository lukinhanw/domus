import { useState } from 'react'
import { Tooltip } from './Tooltip'

export function Checkbox({ label, description, checked, onChange }) {
	const [isHovered, setIsHovered] = useState(false)

	const handleClick = () => {
		onChange?.({ target: { checked: !checked } })
	}

	const checkboxContent = (
		<div
			className="relative flex items-center space-x-2 cursor-pointer select-none"
			onClick={handleClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			role="checkbox"
			aria-checked={checked}
			tabIndex={0}
			onKeyPress={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					handleClick()
				}
			}}
		>
			<div className="relative">
				<input
					type="checkbox"
					checked={checked}
					onChange={onChange}
					className="sr-only"
					aria-hidden="true"
				/>
				<div
					className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200
						${checked 
							? 'bg-primary-500 border-primary-500' 
							: isHovered 
								? 'border-primary-400' 
								: 'border-gray-300 dark:border-gray-600'
						}`}
				>
					{checked && (
						<svg
							className="w-3 h-3 text-white"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
						</svg>
					)}
				</div>
			</div>
			<span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
		</div>
	)

	return description ? (
		<Tooltip content={description}>
			{checkboxContent}
		</Tooltip>
	) : (
		checkboxContent
	)
}