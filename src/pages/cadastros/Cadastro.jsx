import {React, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {CadastroService} from "../../services/UserService"
import {useAuth} from '../../auth/AuthContext'

const Cadastro = () => {
    const navigate = useNavigate()
    const {login} = useAuth()
    const[nome, setNome] = useState("")
    const[sobrenome, setSobrenome] = useState("")
    const[email, setEmail] = useState("")
    const[telefone, setTelefone] = useState("")
    const[senha, setSenha] = useState("")
    const[rua, setRua] = useState("")
    const[bairro, setBairro] = useState("")
    const[numero, setNumero] = useState("")
    const[complemento, setComplemento] = useState("")
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

            const userDTO = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha,
                telefone: telefone,
                 endereco: [
                    {
                        street: rua,
                        neighborhood: bairro,
                        number: numero,
                        complement: complemento,
                        city: cidade,
                        state: estado,
                        zipcode: cep
                    }
                ]
            }

            await CadastroService(userDTO)
            alert("Cadastro realizado com sucesso")
            await login(email, senha, true)
            navigate("/")
        }catch(err){
            setError("Erro ao fazer login: " + err.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="cadastro-container">
            <form className="cadastro-form" onSubmit={handleSubmit} encType='multipart/form-data'>
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
                        <label htmlFor="telefone">Telefone</label>
                        <input type="text" id="telefone" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Digite seu telefone" disabled={loading}/>
                    </div>
                </div>

                <div className='datas'>
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Digite sua senha" disabled={loading}/>
                    </div>
                    <div className='form-group'>
                    </div>
                </div>

                <div className="datas">
                    <div className="form-group">
                        <label  htmlFor="rua">Rua</label>
                        <input type="text" id="rua" value={rua} onChange={e => setRua(e.target.value)} placeholder="Rua" disabled={loading}/>
                    </div>
                    <div className="form-group">
                        <label  htmlFor="bairro">Bairro</label>
                        <input type="text" id="bairro" value={bairro} onChange={e => setBairro(e.target.value)} placeholder="Bairro" disabled={loading}/>
                    </div>
                </div>

                <div className='datas'>
                    <div className="form-group">
                        <label  htmlFor="numero">Número</label>
                        <input type="text" id="numero" value={numero} onChange={e => setNumero(e.target.value)} placeholder="Número" disabled={loading}/>
                    </div>
                    <div className="form-group">
                        <label  htmlFor="complemento">Complemento</label>
                        <input type="text" id="complemento" value={complemento} onChange={e => setComplemento(e.target.value)} placeholder="Complemento, ap., bloco... " disabled={loading}/>
                    </div>
                </div>

                <div className='datas'>
                    <div className="form-group">
                        <label  htmlFor="cidade">Cidade</label>
                        <input type="text" id="cidade" value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Digite sua cidade" disabled={loading}/>
                    </div>
                    <div className="form-group">
                        <label  htmlFor="estado">Estado</label>
                        <select type="text" id="estado" value={estado} onChange={e => setEstado(e.target.value)} placeholder="Digite seu estado" disabled={loading}>
                            <option value="">Selecione um estado</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                        </select>
                    </div>
                </div>

                <div className='datas'>
                    <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input type="text" id="cep" value={cep} onChange={e => setCep(e.target.value)} placeholder="Digite seu CEP" disabled={loading}/>
                    </div>
                    <div className="form-group"></div>
                </div>

                <button type="submit" className="cadastro-button" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
        </div>
    )
}

export default Cadastro;