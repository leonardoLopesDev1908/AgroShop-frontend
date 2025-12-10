import api from "../services/api"


export const fazerPedido = async () => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.post(`/pedidos/usuario/solicitar`,
            {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        throw error
    }
}

export const getPedidos = async() => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.get(`/pedidos/usuario/pedidos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        throw error
    }
}

export const getPedidoPorId = async (id) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.get(`/pedidos/pedido/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error
    }
}

export const searchPedidos = async(query) => {
    try{
        const token = localStorage.getItem("token")
        console.log(query)
        const response = await api.get(`/pedidos/pesquisar?${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        throw error
    }
}

export const atualizarStatus = async(id, status) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.put(`/pedidos/pedido/${id}/atualizar`, 
            {status}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error
    }
}

export const excluirPedido = async(id) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.delete(`/pedidos/pedido/${id}/excluir`, {
            headers: {
                Authorization: `Bearer ${token}`,
                 "Content-Type": "application/json"
            }
        })
        return response.data
    }catch(error){
        throw error
    }
}

export const cancelarPedido = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.put(`/pedidos/pedido/${id}/cancelar`,
            null, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};