import api from "./api"

export const getDistintosProdutosByNome = async () => {
    try{
        const response = await api.get(`/produtos/distintos`)
        return response.data;
    } catch(error){
        throw error;
    }
}

export const getProdutosFiltrados = async (query) => {
    try {
        const response = await api.get(`/produtos?${query}`)
        return response.data
    }catch(error){
        throw error
    }
}


export const getProdutoById = async (id) => {
  try{
    const response = await api.get(`/produtos/${id}`)
    return response.data
  }catch(error){
    throw error
  }
}

export const addProduct = async (nome, marca, descricao, preco, category, 
  estoque, peso, altura, largura, comprimento) =>{
    try{
      const response = await api.post('/produtos', 
        {
          nome: nome,
          marca: marca,
          descricao: descricao,
          preco: preco,
          category: category,
          estoque: estoque,
          peso: peso,
          altura: altura,
          largura: largura,
          comprimento: comprimento
        });
      return response.data;
    }catch (err) {
      throw new Error(err.response?.data?.message || "Erro ao cadastrar produto")
    }
}
  
export const uploadImage = async (image, produtoId) => {
  try {
    const formData = new FormData();
    formData.append("files", image);
    formData.append("produtoId", produtoId);
    
    const response = await api.post(`/produto/imagens`, formData, {
      headers: {
         "Content-Type": "multipart/form-data" },
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro no upload da imagem");
  }
};

export const deleteProduto = async(id) => {
  try{
    const response = await api.delete(`/produtos/${id}`)
  } catch(error){
    throw error
  }
}

export const updateProduto = async(id, dto) => {
  try{
    const response = await api.put(`/produtos/${id}`,
      dto, {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    return response.data
  }catch(error){
    throw error
  }
}

export const getProdutoByCategoria = async(category) => {
  try{
    const response = await api.get(`/produtos/produto/categoria`, {
      params: {category}
    });
    return response.data.data;
  }catch(error){
    throw error
  }
}

export const getOutrosProdutos = async(category) => {
  try{
    const response = await api.get(`/produtos/outros`, {
      params: {category}
    })
    return response.data.data;
  }catch(error){
    throw error
  }
}