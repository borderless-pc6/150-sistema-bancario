import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import "./RegisterPage2.css"

interface AddressFormData {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    country: string
}

interface FormErrors {
    street?: string
    number?: string
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
}

interface RegisterPage2Props {
    onGoNext: () => void;
}


const AddressRegistrationPage = ({ onGoNext }: RegisterPage2Props) => {
    const [formData, setFormData] = useState<AddressFormData>({
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Brasil",
    })

    const [errors, setErrors] = useState<FormErrors>({})

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {}

        if (!formData.street.trim()) newErrors.street = "Rua é obrigatória"
        if (!formData.number.trim()) newErrors.number = "Número é obrigatório"
        if (!formData.neighborhood.trim()) newErrors.neighborhood = "Bairro é obrigatório"
        if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória"
        if (!formData.state.trim()) newErrors.state = "Estado é obrigatório"
        if (!formData.zipCode.trim()) newErrors.zipCode = "CEP é obrigatório"
        else if (!/^\d{5}-\d{3}$|^\d{8}$/.test(formData.zipCode)) {
            newErrors.zipCode = "CEP inválido. Use o formato 00000-000 ou 00000000"
        }

        return newErrors
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newErrors = validateForm()

        if (Object.keys(newErrors).length === 0) {
            console.log("Form submitted:", formData)
            alert("Endereço registrado com sucesso!")
        } else {
            setErrors(newErrors)
        }
    }

    useEffect(() => {
        const fetchAddress = async () => {
            const cep = formData?.zipCode?.replace(/\D/g, "")
            if (cep && cep.length === 8) {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    const data = await response.json()

                    if (!data.erro) {
                        setFormData(prevData => ({
                            ...prevData,
                            street: data.logradouro || "",
                            neighborhood: data.bairro || "",
                            city: data.localidade || "",
                            state: data.uf || "",
                        }))
                        setErrors(prev => ({
                            ...prev,
                            street: undefined,
                            neighborhood: undefined,
                            city: undefined,
                            state: undefined,
                            zipCode: undefined,
                        }))
                    } else {
                        setErrors(prev => ({
                            ...prev,
                            zipCode: "CEP não encontrado",
                        }))
                    }
                } catch (error) {
                    console.error("Erro ao buscar CEP:", error)
                    setErrors(prev => ({
                        ...prev,
                        zipCode: "Erro ao buscar CEP",
                    }))
                }
            }
        }

        if (formData.zipCode) {
            fetchAddress()
        }
    }, [formData.zipCode])

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h1 className="registration-title">Cadastro de Endereço</h1>
                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="street">Rua</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            className={errors.street ? "input-error" : ""}
                        />
                        {errors.street && <span className="error-message">{errors.street}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="number">Número</label>
                            <input
                                type="text"
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className={errors.number ? "input-error" : ""}
                            />
                            {errors.number && <span className="error-message">{errors.number}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="complement">Complemento</label>
                            <input
                                type="text"
                                id="complement"
                                name="complement"
                                value={formData.complement}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="neighborhood">Bairro</label>
                        <input
                            type="text"
                            id="neighborhood"
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                            className={errors.neighborhood ? "input-error" : ""}
                        />
                        {errors.neighborhood && <span className="error-message">{errors.neighborhood}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city">Cidade</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className={errors.city ? "input-error" : ""}
                            />
                            {errors.city && <span className="error-message">{errors.city}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">Estado</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className={errors.state ? "input-error" : ""}
                            />
                            {errors.state && <span className="error-message">{errors.state}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="zipCode">CEP</label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            placeholder="00000-000"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className={errors.zipCode ? "input-error" : ""}
                        />
                        {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">País</label>
                        <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} disabled />
                    </div>

                    <div className="form-actions">
                        <button onClick={onGoNext} type="submit" className="submit-button">
                            Cadastrar Endereço
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddressRegistrationPage