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

export const NameService = async (email) => {
    try{
        const response = await api.get(`/usuarios/usuario/${email}`)
        return response.data.data
    }catch(error){
        throw new Error(error.response?.data?.message)
    }
}

export const CadastroService = async(nome, sobrenome, email, senha,
                                    endereco, cidade, estado, cep
) => {
    try{
        const response = await api.post(`/usuarios/cadastrar`, {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senha,
            endereco: {
                endereco: endereco,
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