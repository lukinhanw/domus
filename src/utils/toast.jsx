import { toast } from 'react-hot-toast'
import { RiCheckLine, RiErrorWarningLine, RiInformationLine } from 'react-icons/ri'

const toastBaseStyle = {
	minWidth: '300px',
	padding: '16px',
	borderRadius: '12px',
	boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
	border: '1px solid rgba(255, 255, 255, 0.1)',
	color: 'white'
}

const toastConfig = {
	position: 'bottom-right',
	duration: 4000,
}

const ToastMessage = ({ icon: Icon, title, message, type }) => {
	const styles = {
		success: {
			...toastBaseStyle,
			backgroundColor: '#047857'
		},
		error: {
			...toastBaseStyle,
			backgroundColor: '#B91C1C'
		},
		info: {
			...toastBaseStyle,
			backgroundColor: '#1E40AF'
		}
	}

	return (
		<div style={styles[type]}>
			<div className="flex items-start">
				<div className="flex-shrink-0 text-white">
					<Icon className="w-6 h-6" />
				</div>
				<div className="ml-3 flex-1">
					<p className="font-semibold text-white">{title}</p>
					{message && (
						<p className="mt-1 text-sm text-white/90">{message}</p>
					)}
				</div>
			</div>
		</div>
	)
}

export const showToast = {
	success: (title, message) => {
		toast.custom(
			(t) => (
				<ToastMessage
					icon={RiCheckLine}
					title={title}
					message={message}
					type="success"
				/>
			),
			toastConfig
		)
	},
	error: (title, message) => {
		toast.custom(
			(t) => (
				<ToastMessage
					icon={RiErrorWarningLine}
					title={title}
					message={message}
					type="error"
				/>
			),
			toastConfig
		)
	},
	info: (title, message) => {
		toast.custom(
			(t) => (
				<ToastMessage
					icon={RiInformationLine}
					title={title}
					message={message}
					type="info"
				/>
			),
			toastConfig
		)
	}
}