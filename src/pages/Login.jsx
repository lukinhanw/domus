import { LoginCard } from '../components/login/LoginCard'
import { LoginForm } from '../components/login/LoginForm'
import Lottie from 'lottie-react'
import securityAnimation from '../assets/animations/security-animation.json'

export default function Login() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
			<div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8">
				{/* Lado esquerdo - Animação e texto */}
				<div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 space-y-6">
					<div className="w-full max-w-md">
						<Lottie
							animationData={securityAnimation}
							className="w-full h-auto max-w-lg mx-auto"
						/>
					</div>
					<div className="text-center space-y-4">
						<h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
							Bem-vindo ao DOMUS
						</h1>
						<p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
							Gerencie portarias, acessos e visitantes de forma simples e segura
						</p>
					</div>
				</div>

				{/* Lado direito - Formulário de login */}
				<div className="w-full lg:w-1/2 flex items-center justify-center">
					<div className="w-full max-w-md">
						<LoginCard>
							<LoginForm />
						</LoginCard>
					</div>
				</div>
			</div>
		</div>
	)
}