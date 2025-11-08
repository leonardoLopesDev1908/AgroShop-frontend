import {React, useState, createContext, useContext, useEffect} from "react"
import { LoginService, NameService, RefreshService } from "../component/services/UserService"
import { store } from "../store/store";

const AuthContext = createContext()

function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null)
    const[token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
            const payload = parseJwt(storedToken)
            
            if(payload && payload.exp * 1000 < Date.now()){
                refreshToken()
            } else {
                setToken(storedToken)
                setUser(JSON.parse(storedUser))
            }
        }
    }, [])
    
    const login = async (email, senha, lembrar) => {
        try{
            const response = await LoginService(email, senha)
            const {accessToken} = response  
    
            const data = await NameService(email)
            const nome = data.nome
            const sobrenome = data.sobrenome

            setToken(accessToken)

            const payload = parseJwt(accessToken)
            if(payload){
                const userData = {
                    id: payload.id,
                    email: payload.sub,
                    roles: payload.roles,
                    nome: nome,
                    sobrenome: sobrenome
                }
                setUser(userData)
                if(lembrar){
                    localStorage.setItem("user", JSON.stringify(userData))
                    localStorage.setItem("token", accessToken)
                }
            }
        } catch(err){
            alert(err.message)
        }
    }

    const refreshToken = async () => {
        try {
            const { accessToken } = await RefreshService();

            setToken(accessToken);
            localStorage.setItem("token", accessToken);

            const payload = parseJwt(accessToken);
            if (payload && user) {
                setUser({ ...user, email: payload.sub, roles: payload.roles });
            }

            return accessToken;
        } catch (error) {
            console.error("Erro ao atualizar token:", error);
            logout();
        }
    };


    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    }

    const value = {
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        refreshToken,
        setUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}