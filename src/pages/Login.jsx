import { AnimatedBackground } from '../components/login/AnimatedBackground'
import { LoginCard } from '../components/login/LoginCard'
import { LoginForm } from '../components/login/LoginForm'

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <AnimatedBackground />
      <LoginCard>
        <LoginForm />
      </LoginCard>
    </div>
  )
}