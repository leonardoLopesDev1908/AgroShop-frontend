import React, {useState, useEffect} from 'react'
import {LoginService} from '../component/services/UserService'
import {useAuth} from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () =>{
    const navigate = useNavigate()
    const {login, isAuthenticated} = useAuth()
    const [lembrar, setLembrar] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if(isAuthenticated){
            navigate("/")
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (e) => {
       e.preventDefault()
       setError("")
       setLoading(true)

        try{
            await login(email, senha, lembrar)
        } catch(err){
            setError("Erro ao fazer login!")
        }finally{
            setLoading(false)
        }
    } 

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu usuário ou email"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite sua senha"
                        disabled={loading}
                    />
                </div>

                <div className="form-options">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            onChange={(e) => setLembrar(e.target.checked)}
                            disabled={loading}
                        />
                        Lembrar de mim
                    </label>
                    
                    <a href="/esqueci-senha" className="forgot-password">
                        Esqueci a senha
                    </a>
                </div>

                <button 
                    type="submit" 
                    className="login-button"
                    disabled={loading}
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <div className="register-link">
                    Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
                </div>
            </form>
        </div>
    )
}

export default Login;