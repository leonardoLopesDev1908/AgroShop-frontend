import { api } from "./api"

export const getDistintosProdutosByNome = async () => {
    try{
        const response = await api.get("/produtos/distintos/produtos")
        return response.data;
    } catch(error){
        throw error;
    }
}