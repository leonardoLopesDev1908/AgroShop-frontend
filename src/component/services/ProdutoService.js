import { api } from "./api"

export const getDistintosProdutosByNome = async () => {
    try{
        const response = await api.get("/produtos/distintos/produtos")
        return response.data;
    } catch(error){
        throw error;
    }
}

export const getProdutosFiltrados = async (query) => {
    try {
        const response = await api.get(`/produtos/produtos?${query}`)
        return response.data
    }catch(error){
        throw error
    }
}

export const addProductToCart = async (id) => {
    try{

    }catch(error){
        
    }
}