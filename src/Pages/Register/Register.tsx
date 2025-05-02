import { useState } from 'react';
import './Register.css';
import '../../App'

interface RegisterProps {
    onBackToHome: () => void
    onGoNext: () => void
}

function RegisterPage({ onBackToHome, onGoNext }: RegisterProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Form submitted:', { email, password, confirmPassword, termsAccepted });
    };

    return (
        <div className="register-container">
            <header className="register-header">
                <h3>Osman Bank</h3>
                <button onClick={onBackToHome} type='submit' className="close-button">×</button>
            </header>

            <div className="register-content">
                <div className="register-form-section">
                    <h1>Abra agora sua conta</h1>
                    <p className="form-description">
                        Informe seu e-mail e defina uma senha a abertura da sua conta.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Informe seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Informe sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar senha</label>
                            <div className="password-input-container">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    placeholder="Informe a senha novamente"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                </button>
                            </div>
                        </div>

                        <p className="password-requirements">
                            Sua senha deve conter no mínimo 8 caracteres, pelo menos 1 número e 1 letra.
                        </p>

                        <div className="form-group checkbox-group">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                required
                            />
                            <label htmlFor="terms">
                                Li e aceito os <a href="#" className="terms-link">Termos e Condições de Uso</a> da Asaas.
                            </label>
                        </div>

                        <button

                            type="submit"
                            onClick={onGoNext}
                            className="create-account-button"
                            disabled={!email || !password || !confirmPassword || !termsAccepted}
                        >
                            Criar conta
                        </button>
                    </form>
                </div>

                <div className="register-info-section">
                    <h2>Cadastre-se em menos de 5 minutos!</h2>
                    <p>
                        Abra sua conta e aproveite a solução mais completa e segura em emissão de cobranças e serviços financeiros.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
