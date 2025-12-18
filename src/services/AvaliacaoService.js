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
        const response = await api.post(`/produtos/${idProduto}/avaliacoes`,
            dto, {
        })
        return response.data
    } catch(error){
        throw error;
    }
}

export const excluirAvaliacao = async(comentario) => {
    try{
        await api.delete(`/produtos/avaliacoes/${comentario.id}`, 
            comentario, {
        })
    } catch(error){
        throw error;
    }
}

export const jaAvaliou = async(idProduto) => {
    try{
        const response = await api.get(`/produtos/${idProduto}/avaliacoes/me`,{
        })
        return response.data
    } catch(error){
        throw error;
    }
}