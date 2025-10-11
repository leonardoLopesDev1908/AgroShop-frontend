import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {getProdutoById} from "../services/ProdutoService"
import {Spinner} from "react-bootstrap"

const Produto = () => {
    const { id } = useParams()
    const [produto, setProduto] = useState({});
    const[loading, setLoading] = useState(null)
    const[error, setError] = useState("")

    useEffect(() => {
        const fetchProduto = async () => {
            try{
                const data = await getProdutoById(id)
                setProduto(data)
            }catch(err){
                setError("Erro: " + err)
            }finally{
                setLoading(false)
            }
        }
            fetchProduto()
    }, [id])

  if (loading) return <Spinner animation="border" className="m-5" />
  if (error) return <p className="text-danger text-center mt-5">{error}</p>
  if (!produto) return <p className="text-center mt-5">Produto não encontrado</p>

  return (
    <div className="produto-container">
      <div className="produto-card">
        <div className="produto-imagem">
          {produto.imagens && produto.imagens.length > 0 ? (
            <img
              src={produto.imagens[0].url}
              alt={produto.nome}
              className="img-fluid"
            />
          ) : (
            <div className="sem-imagem">Sem imagem disponível</div>
          )}
        </div>

        <div className="produto-info">
          <h2 className="produto-nome">{produto.nome}</h2>
          <p className="produto-descricao">{produto.descricao}</p>
          <h3 className="produto-preco">
            {produto?.preco !== undefined ? `R$ ${produto.preco.toFixed(2)}` : "Preço indisponível"}
          </h3>
          <p className={`produto-estoque ${produto.estoque > 0 ? "disponivel" : "indisponivel"}`}>
            {produto.estoque > 0 ? `Em estoque: ${produto.estoque}` : "Fora de estoque"}
          </p>
          <button
            className="btn btn-primary"
            disabled={produto.estoque === 0}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  )
}

export default Produto;