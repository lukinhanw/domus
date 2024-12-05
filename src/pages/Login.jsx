import { LoginCard } from '../components/login/LoginCard'
import { LoginForm } from '../components/login/LoginForm'

export default function Login() {
	return (
		<>
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="absolute top-0 left-0 w-full h-full bg-gradient animate-gradient"></div>
			<div className="min-h-screen relative z-10 flex items-center justify-center px-4">
				<LoginCard>
					<LoginForm />
				</LoginCard>
			</div>
		</>
	)
}