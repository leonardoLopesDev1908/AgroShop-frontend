import api from "../services/api"

  export const addProductToCart = async (produtoId, quantidade) => {
    try {
      const response = await api.post(
        `/usuario/me/carrinho/item?produtoId=${produtoId}&quantidade=${quantidade}`,
        {},
      );
      return response.data.data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };
  
  export const removeItemFromCart = async (produtoId) => {
    try{
      const response = await api.delete(`/usuario/me/carrinho/item/${produtoId}`)
      return response.data.data;
    }catch(error){
      console.error(error.response?.data || error.message);
      throw error;
    }
  }

  export const getItensCarrinho = async() => {
    try{
      const response = await api.get(`/usuario/me/carrinho/itens`);
      return response.data.data
    }catch(error){
      console.log(error.message)
      throw new Error(error.response?.data || error.message)
    }
  }

  export const clearCarrinho = async() => {
    try{
      const response = await api.delete(`/usuario/me/carrinho/itens`)
      return response.data
    }catch(error){
      throw new Error(error.response?.data || error.message)
    }
  }

  export const updateCarrinho = async(produtoId, quantidade) => {
    try{
      const response = await api.put(`/usuario/me/carrinho`,
        {produtoId, quantidade},)
      return response.data
    } catch(error){
      throw error
    }
  }
