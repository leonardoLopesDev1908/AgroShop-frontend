import api from "../services/api"


export const fazerPedido = async (freteSelecionado) => {
    try{
        const response = await api.post(`/usuario/me/pedido`,
            freteSelecionado, {
        })
        return response
    }catch(error){
        throw error
    }
}

export const getPedidos = async() => {
    try{
        const response = await api.get(`/usuario/me/pedidos`)
        return response.data
    }catch(error){
        throw error
    }
}

export const getPedidoPorId = async (id) => {
    try{
        const response = await api.get(`/usuario/me/pedido/${id}`)
        return response.data
    } catch(error){
        throw error
    }
}

export const searchPedidos = async(query) => {
    try{
        console.log(query)
        const response = await api.get(`/usuario/pedidos?${query}`)
        return response.data
    }catch(error){
        throw error
    }
}

export const atualizarStatus = async(id, status) => { 
    try{
        const response = await api.put(`/usuario/pedido/${id}`, 
            {status})
        return response.data
    } catch(error){
        throw error
    }
}

export const excluirPedido = async(id) => {
    try{
        const response = await api.delete(`/usuario/pedido/${id}`, {
                 "Content-Type": "application/json"
        })
        return response.data
    }catch(error){
        throw error
    }
}

export const cancelarPedido = async (id) => {
    try {
        const response = await api.put(`/usuario/me/pedido/${id}`,
            null, 
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};