import {api} from "./api"

export const getAvaliacoes = async(idProduto) => {
    try{
        const response = await api.get(`/produtos/${idProduto}/avaliacoes`)
        return response.data
    } catch(error){
        throw error
    }
}

export const addAvaliacao = async(dto, idProduto) => {
    try{
        const token = localStorage.getItem("token")
        console.log(dto)
        const response = await api.post(`/produtos/${idProduto}/avaliar`,
            dto, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error;
    }
}

export const excluirAvaliacao = async(comentario) => {
    try{
        const token = localStorage.getItem("token")
        await api.delete(`/produtos/avaliacao/${comentario.id}`, 
            comentario, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
        })
    } catch(error){
        throw error;
    }
}

export const jaAvaliou = async(idProduto) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.get(`/produtos/avaliacao/${idProduto}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error;
    }
}