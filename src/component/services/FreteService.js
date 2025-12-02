import {api} from "./api"

export const calculaFreteProduto = async(idProduto, cepDestino) => {
    try{
        const response = await api.post(
            `/melhorenvio/frete/produto/cotar?idProduto=${idProduto}&cepDestino=${cepDestino}`
        );
        return response.data;
    } catch(error){
        throw error;
    }
}

export const calculaFreteItens = async(cepDestino) => {
    try{
        const token = localStorage.getItem("token")
        const response =  await api.post(
            `/melhorenvio/frete/itens/cotar?cepDestino=${cepDestino}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data
    } catch(error){
        throw error
    }
}