import React, {useState, useEffect} from 'react'
import {LoginService} from '../../services/UserService'
import {useAuth} from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () =>{
    const navigate = useNavigate()
    const {login, isAuthenticated} = useAuth()
    const [lembrar, setLembrar] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";

    const handleSubmit = async (e) => {
       e.preventDefault()
       setError("")
       setLoading(true)

        try{
            const response = await login(email, senha, lembrar);
            navigate("/")
        }catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Erro ao fazer login")
            } else {
                setError("Não foi possível conectar ao servidor")
            }
        } finally{
            setLoading(false)
        }
    } 

    const handleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    } ;

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
                    <button
                        type="button"
                        onClick={handleLogin}
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "10px 10px",
                            display: "flex",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#444",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                        >
                        <img
                            src="https://developers.google.com/identity/images/g-logo.png"
                            alt="Google Logo"
                            style={{ width: "20px" }}
                        />
                        </button>
                    
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