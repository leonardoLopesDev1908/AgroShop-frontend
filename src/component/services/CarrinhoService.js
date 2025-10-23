import {api} from "../services/api"

  export const addProductToCart = async (produtoId, quantidade) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await api.post(
        `/itens/item/cadastrar?produtoId=${produtoId}&quantidade=${quantidade}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };
  
  export const removeItemFromCart = async (produtoId) => {
    try{
      const token = localStorage.getItem("token")
      const response = await api.delete(`/itens/carrinho/item/${produtoId}/excluir`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data.data;
    }catch(error){
      console.error(error.response?.data || error.message);
      throw error;
    }
  }

  export const getItensCarrinho = async() => {
    try{
      const token = localStorage.getItem("token")
      const response = await api.get(`/carrinho/itens`, {
        headers: {Authorization: `Bearer ${token}`}
      });
      return response.data.data
    }catch(error){
      console.log(error.message)
      throw new Error(error.response?.data || error.message)
    }
  }

  export const clearCarrinho = async() => {
    try{
      const token = localStorage.getItem("token")
      const response = await api.delete(`/carrinho/carrinho/limpar`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      return response.data
    }catch(error){
      throw new Error(error.response?.data || error.message)
    }
  }

  export const updateCarrinho = async(produtoId, quantidade) => {
    try{
      const token = localStorage.getItem("token")
      const response = await api.put(`/itens/carrinho/atualizar`,
        {produtoId, quantidade}, 
        {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }
      )
      return response.data
    } catch(error){
      throw error
    }
  }
