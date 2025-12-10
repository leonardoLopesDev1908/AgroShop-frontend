import { React, useState, createContext, useContext, useEffect } from "react";
import api from "../component/services/api"; 
import { NameService } from "../component/services/UserService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await api.get("/api/v1/auth/me");
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, senha, lembrar) => {
        try {
            const response = await api.post("/api/v1/auth/login", {
                email,
                senha
            });

            const userData = {
                id: response.data.id,
                email: response.data.email,
                roles: response.data.roles || [],
                nome: response.data.nome,
                sobrenome: response.data.sobrenome || ""
            };

            setUser(userData);
            
            if (lembrar) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            return { success: true, user: userData };
            
        } catch (error) {
            console.error("Login error:", error);
            return { 
                success: false, 
                error: error.response?.data?.message || "Erro no login" 
            };
        }
    };

    const logout = async () => {
        try {
            await api.post("/api/v1/auth/logout");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            setLoading(false);
        }
    };

    const updateUser = (updatedData) => {
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    const loginOAuth2 = async (oauthToken) => {
        console.warn("OAuth2 precisa ser adaptado para cookies");
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
        checkAuth,
        loginOAuth2 
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <div>Carregando autenticação...</div>}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
};