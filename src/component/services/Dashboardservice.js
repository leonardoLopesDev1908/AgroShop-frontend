import api from "./api"

export const getVendasPorMes = async(anoSelecionado) => {
    try{
        console.log("anoBusca: ", anoSelecionado)
        const token = localStorage.getItem("token")
        const response = await api.get(`/dashboard/vendas-mes?anoBusca=${anoSelecionado}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error
    }
}

export const getProdutosMaisVendidos = async (dataInicio, dataFim) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(
      `/dashboard/produtos-vendidos?dataInicio=${encodeURIComponent(
        dataInicio
      )}&dataFim=${encodeURIComponent(dataFim)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;   
  } catch (error) {
    throw error;
  }
};

export const getTotalVendas = async(anoVendas) => {
    try{
        console.log("anovendas: ", anoVendas)
        const token = localStorage.getItem("token")
        const response = await api.get(`/dashboard/total-vendas?dataInicio=${anoVendas}-01-01&dataFim=${anoVendas}-12-31`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error
    }
}

export const getTotalProdutos = async() => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.get(`/dashboard/total-produtos`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error
    }
}

export const getTotalClientes = async() => {
    try{
        const token = localStorage.getItem("token")
        const response = await api.get(`/dashboard/total-clientes`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        throw error
    }
}
