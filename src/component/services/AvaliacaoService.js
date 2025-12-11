import api from "./api"

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
        console.log(dto)
        const response = await api.post(`/produtos/${idProduto}/avaliar`,
            dto, {
        })
        return response.data
    } catch(error){
        throw error;
    }
}

export const excluirAvaliacao = async(comentario) => {
    try{
        await api.delete(`/produtos/avaliacao/${comentario.id}`, 
            comentario, {
        })
    } catch(error){
        throw error;
    }
}

export const jaAvaliou = async(idProduto) => {
    try{
        const response = await api.get(`/produtos/avaliacao/${idProduto}/existe`,{
        })
        return response.data
    } catch(error){
        throw error;
    }
}