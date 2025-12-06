import {api} from "../services/api"

  export const addProductToCart = async (produtoId, quantidade) => {
    try {
      const token = localStorage.getItem("token"); 
      const response = await api.post(
        `/usuario/me/carrinho/item?produtoId=${produtoId}&quantidade=${quantidade}`,
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
      const response = await api.delete(`/usuario/me/carrinho/item/${produtoId}`,
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
      const response = await api.get(`/usuario/me/carrinho/itens`, {
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
      const response = await api.delete(`/usuario/me/carrinho/limpar`, {
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
      const response = await api.put(`/usuario/me/carrinho/atualizacao`,
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
