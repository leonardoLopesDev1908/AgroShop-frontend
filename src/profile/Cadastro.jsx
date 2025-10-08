import {React, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {CadastroService} from "../component/services/UserService"

const Cadastro = () => {
    const[nome, setNome] = useState("")
    const[sobrenome, setSobrenome] = useState("")
    const[email, setEmail] = useState("")
    const[senha, setSenha] = useState("")
    const[endereco, setEndereco] = useState("")
    const[cidade, setCidade] = useState("")
    const[estado, setEstado] = useState("")
    const[cep, setCep] = useState("")
    const[error, setError] = useState("")
    const[loading, setLoading] = useState(false)

    const cepReges = "/^\d{5}-?\d{3}$"

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try{
            await CadastroService(nome, sobrenome, email, senha)
            alert("Cadastro realizado com sucesso")
        }catch(err){
            setError("Erro ao fazer login: " + err.message)
        }finally{
            setLoading(false)
        }
    }

    return (
<div className="cadastro-container">
            <form className="cadastro-form" onSubmit={handleSubmit}>
                <h2>Cadastro</h2>

                {error && <div className="error-message">{error}</div>}

                <div className='datas'>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite seu nome" disabled={loading}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="sobrenome">Sobrenome</label>
                        <input type="text" id="sobrenome" value={sobrenome} onChange={e => setSobrenome(e.target.value)} placeholder="Digite seu sobrenome" disabled={loading}/>
                    </div>
                </div>

                <div className='datas'>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email" disabled={loading}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Digite sua senha" disabled={loading}/>
                    </div>
                </div>

                <div className='datas'>
                    <div className="form-group">
                        <label  htmlFor="endereco">Endereço</label>
                        <input type="text" id="endereco" value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Rua, número, complemento" disabled={loading}/>
                    </div>
                    <div className="form-group">
                        <label  htmlFor="cidade">Cidade</label>
                        <input type="text" id="cidade" value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Digite sua cidade" disabled={loading}/>
                    </div>
                </div>

                <div className='datas'>
                    <div className="form-group">
                        <label  htmlFor="estado">Estado</label>
                        <input type="text" id="estado" value={estado} onChange={e => setEstado(e.target.value)} placeholder="Digite seu estado" disabled={loading}/>
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" value={cep} onChange={e => setCep(e.target.value)} placeholder="Digite seu CEP" disabled={loading}/>
                    </div>
                </div>

                <button type="submit" className="cadastro-button" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    )
}

export default Cadastro;