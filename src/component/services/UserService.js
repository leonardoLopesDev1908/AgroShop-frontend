import {api} from "./api"

export const LoginService = async (email, senha) => {
    try{
        const response = await api.post("/auth/login", {
            email: email,
            senha: senha
        })
        return response.data
    } catch(error){
        throw new Error(error.response?.data?.message || "Erro ao fazer login")
    }
}

export const NameService = async (accessToken) => {
    try{
        const response = await api.get(`/usuarios/usuario`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data.data
    }catch(error){
        throw new Error(error.response?.data?.message)
    }
}

export const getUsuarioDados = async() => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.get(`/usuarios/usuario/dados`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error
    }
}

export const CadastroService = async(nome, sobrenome, email, senha,
                                    endereco, numero, complemento,
                                    cidade, estado, cep
) => {
    try{
        const response = await api.post(`/usuarios/cadastrar`, {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha,
            endereco: {
                endereco: endereco,
                numero: numero,
                complemento: complemento,
                cidade: cidade,
                estado: estado,
                cep: cep
            }
        })
        return response.data;
    }catch(error){
        throw new Error(error.response?.data?.message)
    }
}

export const CadastroEndereco = async(endereco) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.post(`/usuarios/endereco/cadastrar`, 
            endereco, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch(error){
        throw error
    }                         
}


export async function RefreshService() {
    const response = await fetch("/auth/refresh-token", {
        method: "POST",
        credentials: "include"
    })
    if(!response.ok){
        throw new Error("Não foi possivel renovar o token")
    }

    return await response.json()
}

export async function getEnderecos(){
    try{
        const token = localStorage.getItem("token")
        const response = await api.get("/usuarios/usuario/endereco", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        throw error
    }
}

export const atualizarUsuario = async(usuarioDTO) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.put(`/usuarios/usuario/atualizar`,
            usuarioDTO, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch(error){
        throw error
    }
} 

export const atualizarSenha = async(email, senhaAtual, senhaNova) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.put(`/usuarios/usuario/alterar-senha`, 
            {email, senhaAtual, senhaNova}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error
    }
}