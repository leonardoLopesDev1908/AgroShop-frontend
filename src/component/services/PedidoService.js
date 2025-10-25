import {api} from "../services/api"


export const fazerPedido = async () => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.post(`/pedidos/usuario/pedido`,
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

export const getPedidos = async () => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.get(`/pedidos/usuario/pedidos`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error
    }
}

export const getPedidoPorId = async(id) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.get('/pedidos/{id}/pedido', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        throw error
    }
}

export const cancelarPedido = async (id) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.delete(`/pedidos/pedido/${id}/cancelar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        throw error
    }
}