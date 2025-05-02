import { useState } from "react"
import "./LoginPage.css"
import logo from '../../assets/Images/logo.svg'
import '../../App'

import { auth } from "../../firebaseconfig"
import { signInWithEmailAndPassword } from "firebase/auth"

interface RegisterProps {
    onBackToHome: () => void
    onGoToInitial: () => void
}

export default function LoginPage({ onBackToHome, onGoToInitial }: RegisterProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await signInWithEmailAndPassword(auth, email, password)
            onGoToInitial() // Login bem-sucedido, vai para a página inicial
        } catch (error: any) {
            console.error(error)
            setErrorMessage("Email ou senha inválidos. Tente novamente.") // Você pode personalizar essa mensagem se quiser
        }
    }

    return (
        <div className="app-wrapper">
            <header className="app-header">
                <img src={logo || "/placeholder.svg"} alt="Osman Bank Logo" className="brand-logo" />
                <button onClick={onBackToHome} className="exit-btn">
                    <span>&times;</span>
                </button>
            </header>

            <main className="content-area">
                <div className="auth-panel">
                    <div className="auth-box">
                        <h1 className="auth-heading">Acesso ao Osman Bank</h1>
                        <p className="auth-subheading">Olá, use os campos abaixo para acessar sua conta Osman Bank.</p>

                        <form className="auth-form" onSubmit={handleLogin}>
                            <div className="input-wrapper">
                                <label htmlFor="email" className="input-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Informe seu e-mail"
                                    className="input-field"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="password" className="input-label">
                                    Senha
                                </label>
                                <div className="password-field-wrapper">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Informe sua senha"
                                        className="input-field"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button type="button" className="visibility-toggle" onClick={togglePasswordVisibility}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            {showPassword ? (
                                                <>
                                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </>
                                            ) : (
                                                <>
                                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                                    <line x1="2" x2="22" y1="2" y2="22" />
                                                </>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Mensagem de erro */}
                            {errorMessage && (
                                <p className="validation-message" style={{ color: 'red' }}>
                                    {errorMessage}
                                </p>
                            )}

                            <div className="recovery-link-wrapper">
                                <a href="#" className="recovery-link">
                                    Esqueci minha senha
                                </a>
                            </div>

                            <button type="submit" className="submit-btn">
                                Acessar conta
                            </button>
                        </form>

                        <div className="registration-section">
                            <p className="registration-text">Ainda não possui uma conta?</p>
                            <a href="#" className="registration-btn">
                                Criar uma conta
                            </a>
                        </div>
                    </div>
                </div>

                {/* Welcome Section */}
                <div className="promo-panel">
                    <div className="promo-content">
                        <h2 className="promo-heading">Seja bem-vindo ao Osman Bank!</h2>
                        <p className="promo-subheading">
                            A solução mais completa e segura em emissão de cobranças e serviços financeiros.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
