import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {getProdutoById, addProductToCart} from "../services/ProdutoService"
import {Spinner} from "react-bootstrap"
import ProductImage from '../utils/ProductImage'
import { useCart } from '../../store/CarrinhoContext'

const Produto = () => {
    const { id } = useParams()
    const {addToCarrinho} = useCart()
    const [produto, setProduto] = useState({});
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState("")
    const[message, setMessage] = useState("")

    const handleAdicionarProduto = async () => {
      setError("")
      setLoading(true)
      try{
        const response = await addProductToCart(produto.id, 1)
        addToCarrinho(1)
        setMessage("Produto adicionado ao carrinho")
      }catch(error){
        setError(error.message)
        console.log(error.message)
      }finally {
        setLoading(false)
      }
    }

    useEffect(() => {
        const fetchProduto = async () => {
          setLoading(true)
            try{
                const data = await getProdutoById(id)
                setProduto(data.data)
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
    <div className="produto-pagina">
      <div className="produto-imagens">
        <div>
          {produto.imagens && produto.imagens.length > 0 ? (
            <>
             <ProductImage productId={produto.imagens[0].id}/>
              {produto.imagens.length > 1 && (
                <div className="produto-miniaturas">
                  {produto.imagens.slice(1).map((img, index) => (
                    <img key={index} src={img.url} alt={`${produto.nome} ${index + 1}`} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="sem-imagem">Sem imagem disponível</div>
          )}
        </div>
        <div>
          {/* implementar sequencia de imagens */}
        </div>
      </div>
      

      <div className="produto-detalhes">
        <span className="produto-marca">{produto.marca || "Marca não informada"}</span>
        <h2 className="produto-nome">{produto.nome}</h2>
        <p className="produto-codigo">Código: {produto.id || "N/A"}</p>
        <p className="success-message">{message}</p>
        <p className="produto-descricao">{produto.descricao}</p>

        <div className="produto-precos">
          {produto.precoPromocional ? (
            <>
              <span className="produto-preco-promocional">
                R$ {produto.precoPromocional.toFixed(2)}
              </span>
              <span className="produto-preco-normal">
                R$ {produto.preco.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="produto-preco-promocional">
              R$ {produto.preco?.toFixed(2) || "Indisponível"}
            </span>
          )}
        </div>

        <p
          className={`produto-estoque ${
            produto.estoque > 0 ? "disponivel" : "indisponivel"
          }`}
        >
        {produto.estoque < 20
        ? (produto.estoque > 0
            ? `Em estoque: ${produto.estoque}`
            : "Fora de estoque")
        : ""}
        </p>

        <div className="produto-acoes">
          <button
            className="btn-principal"
            disabled={produto.estoque === 0}
            onClick={handleAdicionarProduto}
          >
            Adicionar ao carrinho
          </button>
        </div>

        <div className="produto-frete">
          <label htmlFor="cep"><strong>Frete e prazo:</strong> </label>
          <div className="frete-form">
            <input
              type="text"
              id="cep"
              placeholder="Digite o CEP"
            />
            <button type="button" className="">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Produto;