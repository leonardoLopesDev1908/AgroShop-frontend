import api from "./api"

export const getVendasPorMes = async(anoSelecionado) => {
    try{
        const response = await api.get(`/dashboard/vendas-mes?anoBusca=${anoSelecionado}`)
        return response.data
    } catch(error){
        throw error
    }
}

export const getProdutosMaisVendidos = async (dataInicio, dataFim) => {
  try {
    const response = await api.get(
      `/dashboard/produtos-vendidos?dataInicio=${encodeURIComponent(
        dataInicio
      )}&dataFim=${encodeURIComponent(dataFim)}`,
    );
    return response.data;   
  } catch (error) {
    throw error;
  }
};

export const getTotalVendas = async(anoVendas) => {
    try{
        const response = await api.get(`/dashboard/total-vendas?dataInicio=${anoVendas}-01-01&dataFim=${anoVendas}-12-31`)
        return response.data
    } catch(error){
        throw error
    }
}

export const getTotalProdutos = async() => {
    try{
        const response = await api.get(`/dashboard/total-produtos`)
        return response.data
    } catch(error){
        throw error
    }
}

export const getTotalClientes = async() => {
    try{
        const response = await api.get(`/dashboard/total-clientes`)
        return response.data
    } catch(error){
        throw error
    }
}
