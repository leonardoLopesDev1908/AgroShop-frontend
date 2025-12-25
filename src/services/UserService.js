import api from "./api"

export const LoginService = async (email, senha, lembrar) => {
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

export const getUsuarioDados = async() => {
    try{
        const response = await api.get(`/usuarios/me/dados`)
        return response.data
    } catch(error){
        throw error
    }
}

export const CadastroService = async(dto) => {
    try{
        const response = await api.post(`/usuarios/cadastro`, dto)
        return response.data;
    }catch(error){
        throw new Error(error.response?.data?.message)
    }
}

export const CadastroEndereco = async(endereco) => {
    try{
        const response = await api.post(`/usuarios/me/endereco/cadastro`, 
            endereco)
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
        const response = await api.get("/usuarios/me/enderecos")
        return response.data
    }catch(error){
        throw error
    }
}

export const atualizarUsuario = async(usuarioDTO) => {
    try{
        const response = await api.put(`/usuarios/usuario/atualizar`,
            usuarioDTO)
        return response.data
    } catch(error){
        throw error
    }
} 

export const atualizarSenha = async(email, senhaAtual, senhaNova) => {
    try{
        const response = await api.put(`/usuarios/me/atualizacao`, 
            {email, senhaAtual, senhaNova})
        return response.data
    } catch(error){
        throw error
    }
}