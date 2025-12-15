import { React, useState, createContext, useContext, useEffect } from "react";
import api from "../component/services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await api.get("/auth/me", {
                withCredentials: true
            });
            setUser(response.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, senha, lembrar) => {
        try {
            const response = await api.post(
                "/auth/login",
                { email, senha },
                { withCredentials: true }
            );

            setUser(response.data);

            if (lembrar) {
                localStorage.setItem("rememberedEmail", email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            return { success: true, user: response.data };

        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Erro no login"
            };
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout", {}, { withCredentials: true });
        } catch {}
        finally {
            setUser(null);
        }
    };

    const updateUser = (data) => {
        setUser(prev => ({ ...prev, ...data }));
    };

    return (
        <AuthContext.Provider value={{
            user,
            loadingUser,
            isAuthenticated: !!user,
            login,
            logout,
            updateUser
        }}>
            {loadingUser ? <div>Carregando autenticação...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
