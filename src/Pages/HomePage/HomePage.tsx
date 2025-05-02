import './HomePage.css'
import logo from "../../assets/Images/logo.svg"
import '../../App'

interface HomePageProps {
    onRegisterClick: () => void;
    onLoginClick: () => void;
}

function HomePage({ onRegisterClick, onLoginClick }: HomePageProps) {
    return (
        <div className="app">
            <header className="header">
                <div className="container header-container">
                    <div className="logo">
                        <img src={logo || "/placeholder.svg"} alt="ASAS Logo" />

                        <nav className="main-nav">
                            <ul>
                                <li className="dropdown">
                                    <a href="#">
                                        Soluções <span className="dropdown-arrow">▼</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">Preços</a>
                                </li>
                                <li className="dropdown">
                                    <a href="#">
                                        Sobre nós <span className="dropdown-arrow">▼</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="auth-buttons">
                        <button onClick={onLoginClick} type="submit" className="signup-button">
                            Acesse sua conta
                        </button>
                        <button onClick={onRegisterClick} type="submit" className="signup-button">
                            Criar conta grátis
                        </button>
                    </div>
                </div>
            </header>

            <main className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1>Conta digital completa e sem mensalidade</h1>
                        <p>
                            Ofereça diferentes formas de pagamento, gerencie cobranças, antecipe recebíveis e pague
                            fornecedores. Tudo em um só lugar.
                        </p>

                        <div className="signup-card">
                            <h2>Cadastre-se agora!</h2>
                            <p>Preencha seu e-mail</p>
                            <form className="signup-form">
                                <input type="email" placeholder="E-mail" />
                                <p className="terms-text">
                                    Ao clicar você aceita receber nossas comunicações, conforme <a href="#">Política de Privacidade</a>
                                </p>
                                <button onClick={onRegisterClick} type="submit" className="signup-submit-button">
                                    Criar conta grátis
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HomePage
