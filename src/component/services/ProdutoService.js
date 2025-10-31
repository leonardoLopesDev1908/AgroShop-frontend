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
      const token = localStorage.getItem("token")
      const response = await api.post('/produtos/cadastrar', 
        {
          nome: nome,
          marca: marca,
          descricao: descricao,
          preco: preco,
          categoria: categoria,
          estoque: estoque
        },
       {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
      return response.data;
    }catch (err) {
      throw new Error(err.response?.data?.message || "Erro ao cadastrar produto")
    }
}
  
export const uploadImage = async (imagem, produtoId) => {
  try {
    const formData = new FormData();
    const token = localStorage.getItem("token")
    formData.append("files", imagem);
    formData.append("produtoId", produtoId);
    
    const response = await api.post(`/imagens/upload`, formData, {
      headers: {
          Authorization: `Bearer ${token}`,
         "Content-Type": "multipart/form-data" },
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro no upload da imagem");
  }
};

export const deleteProduto = async(id) => {
  try{
    const token = localStorage.getItem("token")
    const response = await api.delete(`/produtos/produto/deletar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch(error){
    throw error
  }
}

export const updateProduto = async(id, dto) => {
  try{
    const token = localStorage.getItem("token")
    const response = await api.put(`/produtos/produto/atualizar/${id}`,
      dto, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    return response.data
  }catch(error){
    throw error
  }
}