import { useState } from "react";
import "./RegisterPage.css";

interface RegisterProps {
    onGoNextCpf: () => void;
    onGoBack: () => void;
}

function FormularioCadastro({ onGoNextCpf, onGoBack }: RegisterProps) {
    const [tipoPessoa, setTipoPessoa] = useState("fisica");
    const [documento, setDocumento] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    const formatarCPF = (valor: string) => {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const formatarCNPJ = (valor: string) => {
        return valor
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    };

    const formatarData = (valor: string) => {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d+)/, "$1");
    };

    return (
        <div className="cadastro-container">
            <div className="cadastro-header">
                <button onClick={onGoBack} className="botao-voltar">×</button>
                Osman Bank
            </div>

            <div className="formulario-wrapper">
                <p>Para começar, nos informe como você trabalha.</p>

                <div className="tipo-pessoa-options">
                    <label className={`pessoa-option ${tipoPessoa === "fisica" ? "ativa" : ""}`}>
                        <input
                            type="radio"
                            name="tipoPessoa"
                            checked={tipoPessoa === "fisica"}
                            onChange={() => {
                                setTipoPessoa("fisica");
                                setDocumento("");
                            }}
                        />
                        <span className="pessoa-titulo">Pessoa Física</span>
                        <span className="pessoa-descricao">Autônomo sem CNPJ</span>
                    </label>

                    <label className={`pessoa-option ${tipoPessoa === "juridica" ? "ativa" : ""}`}>
                        <input
                            type="radio"
                            name="tipoPessoa"
                            checked={tipoPessoa === "juridica"}
                            onChange={() => {
                                setTipoPessoa("juridica");
                                setDocumento("");
                            }}
                        />
                        <span className="pessoa-titulo">Pessoa Jurídica</span>
                        <span className="pessoa-descricao">MEI, LTDA, S/A, SS</span>
                    </label>
                </div>

                <div className="campo-input">
                    <label>{tipoPessoa === "fisica" ? "CPF" : "CNPJ"}</label>
                    <input
                        type="text"
                        placeholder={tipoPessoa === "fisica" ? "000.000.000-00" : "00.000.000/0000-00"}
                        maxLength={tipoPessoa === "fisica" ? 14 : 18}
                        value={documento}
                        onChange={(e) =>
                            setDocumento(
                                tipoPessoa === "fisica"
                                    ? formatarCPF(e.target.value)
                                    : formatarCNPJ(e.target.value)
                            )
                        }
                    />
                </div>

                <div className="campo-input">
                    <label>Data de nascimento</label>
                    <input
                        type="text"
                        placeholder="00/00/0000"
                        maxLength={10}
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(formatarData(e.target.value))}
                    />
                </div>

                <button onClick={onGoNextCpf} className="botao-avancar">Avançar</button>
            </div>
        </div>
    );
}

export default FormularioCadastro;
