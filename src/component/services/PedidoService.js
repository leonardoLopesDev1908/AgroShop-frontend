import {api} from "../services/api"


export const fazerPedido = async (freteSelecionado) => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.post(`/usuario/me/pedido`,
            freteSelecionado, {
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
        const response = await api.get(`/usuario/me/pedidos`, {
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
        const response = await api.get(`/usuario/me/pedido/${id}`, {
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
        const response = await api.get(`/usuario/pedidos/pesquisa?${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        throw error
    }
}

//Esse endpoint não é de acesso do usuário
export const atualizarStatus = async(id, status) => { 
    try{
        const token = localStorage.getItem("token")
        const response = await api.put(`/usuario/pedido/${id}/atualizacao`, 
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
        const response = await api.delete(`/usuario/pedido/${id}`, {
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
        const response = await api.put(`/usuario/me/pedido/${id}/cancelar`,
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