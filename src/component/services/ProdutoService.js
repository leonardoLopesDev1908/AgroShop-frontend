import { api } from "./api"

const pref = "/produtos"

export const getDistintosProdutosByNome = async () => {
    try{
        const response = await api.get(`${pref}/distintos/produtos`)
        return response.data;
    } catch(error){
        throw error;
    }
}

export const getProdutosFiltrados = async (query) => {
    try {
        const response = await api.get(`${pref}/produtos?${query}`)
        return response.data
    }catch(error){
        throw error
    }
}


export const getProdutoById = async (id) => {
  try{
    const response = await api.get(`${pref}/produto/${id}/produto`)
    return response.data
  }catch(error){
    throw error
  }
}

export const addProduct = async (nome, marca, descricao, preco, categoria, 
  estoque) =>{
    try{
      const response = await api.post('/produtos/cadastrar', {
        nome: nome,
        marca: marca,
        descricao: descricao,
        preco: preco,
        categoria: categoria,
        estoque: estoque
      })
      return response.data;
    }catch (err) {
      throw new Error(err.response?.data?.message || "Erro ao cadastrar produto")
    }
  }
  
  export const uploadImage = async (imagem, produtoId) => {
    try {
      const formData = new FormData();
      formData.append("files", imagem);
      formData.append("produtoId", produtoId);
      
      const response = await api.post(`/imagens/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erro no upload");
    }
  };

  /*Carrinho*/
  export const addProductToCart = async (produtoId, quantidade) => {
    try {
      const token = localStorage.getItem("token"); 
      console.log(token)
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
      console.log(token)
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
      console.log(token)
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
      console.log(token)
      const response = await api.delete(`/carrinho/carrinho/limpar`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      return response.data
    }catch(error){
      throw new Error(error.response?.data || error.message)
    }
  }
