import {api} from "./api"

export const calculaFreteProduto = async(idProduto, cepDestino) => {
    try{
        const response = await api.post(
            `/produto/frete/cotacao?idProduto=${idProduto}&cepDestino=${cepDestino}`
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
            `/itens/frete/cotacao?cepDestino=${cepDestino}`, {},
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