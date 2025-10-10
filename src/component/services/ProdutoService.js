import { api } from "./api"

export const getDistintosProdutosByNome = async () => {
    try{
        const response = await api.get("/produtos/distintos/produtos")
        return response.data;
    } catch(error){
        throw error;
    }
}

export const getProdutosFiltrados = async (query) => {
    try {
        const response = await api.get(`/produtos/produtos?${query}`)
        return response.data
    }catch(error){
        throw error
    }
}

export const addProductToCart = async (id) => {
    try{

    }catch(error){
        
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
