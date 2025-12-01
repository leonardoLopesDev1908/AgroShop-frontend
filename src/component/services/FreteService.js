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