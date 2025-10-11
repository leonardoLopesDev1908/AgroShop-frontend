import { api } from "./api"

const pref = "/produtos"

export const getDistintosProdutosByNome = async () => {
    try{
        const response = await api.get(`${pref}/distintos/produtos`)
        return response.data;
    } catch(error){
        throw error;
    }
}

export const getProdutosFiltrados = async (query) => {
    try {
        const response = await api.get(`${pref}/produtos?${query}`)
        return response.data
    }catch(error){
        throw error
    }
}

export const addProductToCart = async (data) => {
    try{
        const response = await api.post(`/item/cadastrar?${data}`)
        return response.data
    }catch(error){
        throw error
    }
}

export const getProdutoById = async (id) => {
    try{
        const response = await api.get(`${pref}/produto/${id}/produto`)
        return response.data
    }catch(error){
        throw error
    }
}