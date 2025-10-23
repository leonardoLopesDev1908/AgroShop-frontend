import {api} from "../services/api"


export const fazerPedido = async () => {
    try{
        const token = localStorage.getItem("token")
        const response = api.post(`/pedidos/usuario/pedido`,
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

export const cancelarPedido = async (id) => {
    try{
        const token = localStorage.getItem("token")
        const response = api.delete(`/pedidos/pedido/${id}/cancelar`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        throw error
    }
}